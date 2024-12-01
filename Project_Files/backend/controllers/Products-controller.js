const Product = require("../models/product_db");
const Category = require("../models/categories_db");
const User = require("../models/users_db");
const { uploadOnCloudinary } = require("../utils/cloudinary");
// const fs = require("fs");
// const { get } = require("http");

const addProduct = async (req, res) => {
  console.log("I am in the add product controller");
  copnsole.log("Files received:", req.files);
  try {
    console.log("Files received:", req.files); // Debugging line
    
    const imageFiles = req.files;
  
    // Ensure the required fields exist
    const productImages = imageFiles.productImagesURL || [];
    const certifications = imageFiles.certifications || [];

    if (productImages.length === 0) {
      return res.status(400).json({ message: "No product images uploaded" });
    }

    if (certifications.length === 0) {
      return res.status(400).json({ message: "No certifications uploaded" });
    }

    // Upload both product images and certifications in parallel
    const imageUrls = await Promise.all(
      productImages.map(async (file) => {
        const uploadResult = await uploadOnCloudinary(file.path);
        return uploadResult ? uploadResult.url : null;
      })
    );

    const certificationsUrls = await Promise.all(
      certifications.map(async (file) => {
        const uploadResult = await uploadOnCloudinary(file.path);
        return uploadResult ? uploadResult.url : null;
      })
    );

    // Prepare the product data with both image URLs
    const productData = {
      ...req.body,
      productImagesURL: imageUrls.filter((url) => url !== null),
      certifications: certificationsUrls.filter((url) => url !== null),
      seller: req.user.id
    };

    // Create the new product
    const newProduct = await Product.create(productData);
    const user = await User.findById(req.user.id);
    user.unsoldItems.push(newProduct._id);
    await user.save();
    
    const category = await Category.findOne({ name: req.body.category });
   
    const subcategory = category.subcategories.find(sub => sub.name === req.body.subCategory);
   console.log(subcategory);
    subcategory.items.push(newProduct._id);
    await category.save();
    // Respond with success
    res.status(200).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

const getProductsBySearch = async (req, res) => {
  try {
    const { name } = req.params;
    const products = await Product.find({ productName: name, productStatus: { $ne: 'unverified' } });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}

const getLatestCreatedProducts = async (req, res) => { 
  try {
    const products = await Product.find({ productStatus: { $ne: 'unverified' } }).sort({ createdAt: -1 }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}

const getOldestCreatedProducts = async (req, res) => {
  try {
    const products = await Product.find({ productStatus: { $ne: 'unverified' } }).sort({ createdAt: 1 }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}

const getProductsByReservePriceRange = async (req, res) => {
  try {
    const { min, max } = req.params;
    const products = await Product.find({ reservePrice: { $gte: min, $lte: max }, productStatus: { $ne: 'unverified' } });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}

const verifyProduct = async (req, res) => {
  const { productId } = req.params;
  try {
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).send("Product not found");
      }
      product.productStatus = "verified";
      await product.save();
      res.status(200).send({
          message: "Product status updated to verified",
          product,
      });
  } catch (err) {
      console.error("Error verifying product:", err);
      res.status(500).send("Internal Server Error");
  }
}

const removeProduct = async (req, res) => {
  const { productId } = req.params;
  try {
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).send("Product not found");
      }
      const seller = await User.findById(product.seller);
      if(!seller) {
          return res.status(404).send("Seller not found");
      }
      seller.unsoldItems = seller.unsoldItems.filter(item => item.toString() !== productId);
      await seller.save();
      const category = await Category.findOne({ name: product.category });
      if(!category) {
          return res.status(404).send("Category not found");
      }
      const subcategory = category.subcategories.find(sub => sub.name === product.subCategory);
      if(!subcategory) {
          return res.status(404).send("Subcategory not found");
      }
      subcategory.items = subcategory.items.filter(item => item.toString() !== productId);
      await category.save();
      await Product.findByIdAndDelete(productId);
      res.status(200).send({
          message: "Product removed successfully",
          product,
      });
  } catch (err) {
      console.error("Error removing product:", err);
      res.status(500).send("Internal Server Error");
  }
}

const getUnverifiedProducts = async (req, res) => {
  try {
    const products = await Product.find({ productStatus: "unverified" });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}

module.exports = { 
  addProduct, 
  getProductsBySearch, 
  getLatestCreatedProducts, 
  getOldestCreatedProducts, 
  getProductsByReservePriceRange,
  verifyProduct,
  removeProduct,
  getUnverifiedProducts
};