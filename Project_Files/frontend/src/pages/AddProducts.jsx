import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProducts.css";

const AddProducts = () => {
  const navigate = useNavigate();

  const categories = ["Collectibles", "Art & Antiques", "Jewellery & Watches", "Furniture", "Wine & Spirits", "Books & Musical Instruments"];
  const subCategories = {
    "Collectibles" : ["Coins & Currency", "Stamps", "Sports Memorabilia", "Comics & Trading Cards"],
    "Art & Antiques": ["Paintings", "Sculptures", "Art Pieces"],
    "Jewellery & Watches": ["Fine Jewellery", "Gemstones", "Luxury Watches", "Vintage Watches"],
    "Furniture": ["Vintage Furniture", "Designer Furniture", "Rugs-Carpets"],
    "Wine & Spirits": ["Fine Wine", "Rare Whiskeys", "Vintage Spirits", "Champagne"],
    "Books & Musical Instruments": ["Vintage Records", "Manuscripts"]
  };

  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    dimensions: '',
    weight: '',
    yearOfManufacture: '',
    manufacturer: '',
    reservePrice: '',
    productImagesURL: [],
    certifications: [],
    category: '',
    subCategory: ''
  });

  const handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleInputFiles = (e) => {
    const name = e.target.name;
    const value = Object.values(e.target.files);

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      if (key !== 'productImagesURL' && key !== 'certifications') {
        formData.append(key, product[key]);
      }
    });

    if (product.productImagesURL) {
      product.productImagesURL.forEach((file) => formData.append('productImagesURL', file));
    }

    if (product.certifications) {
      product.certifications.forEach((file) => formData.append('certifications', file));
    }
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      alert("Token is missing! Please log in again.");
      return;
    }
    try {
      console.log("formdata", formData);
      const response = await fetch('https://bid-master-backend.vercel.app/api/form/addProducts', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
        //credentials: "include",
      });
      const data = await response.json();

      alert("Product added successfully!");
      navigate('/');
    } catch (error) {
      console.log("add product", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="add-products-page">
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <label htmlFor="productName" className="form-label">Product Name</label>
        <input type="text" name="productName" id="productName"
          autoComplete="off"
          value={product.productName}
          onChange={handleInput}
          required
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="productDescription" className="form-label">Product Description</label>
        <textarea
          name="productDescription"
          id="productDescription"
          autoComplete="off"
          value={product.productDescription}
          onChange={handleInput}
          required
          className="form-textarea"
        ></textarea>
      </div>

      <div>
        <label className="form-label">Reserve Price</label>
        <input type="number" name="reservePrice" id="reservePrice"
          autoComplete="off"
          value={product.reservePrice}
          onChange={handleInput}
          onWheel={(e) => e.target.blur()}
          required
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Dimensions</label>
        <input type="text" name="dimensions" id="dimensions"
          autoComplete="off"
          value={product.dimensions}
          onChange={handleInput}
          required
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Weight</label>
        <input type="number" name="weight" id="weight"
          autoComplete="off"
          value={product.weight}
          onChange={handleInput}
          onWheel={(e) => e.target.blur()}
          required
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Brand/Manufacturer</label>
        <input type="text" name="manufacturer" id="manufacturer"
          autoComplete="off"
          value={product.manufacturer}
          onChange={handleInput}
          required
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Year Of Manufacture</label>
        <input type="number" name="yearOfManufacture" id="yearOfManufacture"
          autoComplete="off"
          value={product.yearOfManufacture}
          onChange={handleInput}
          onWheel={(e) => e.target.blur()}
          required
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Upload Image:</label>
        <input
          type="file"
          name="productImagesURL"
          accept="image/*"
          onChange={handleInputFiles}
          className="form-input"
          required
          multiple
        />
      </div>

      <div>
        <label className="form-label">Upload certificates:</label>
        <input
          type="file"
          name="certifications"
          accept=".pdf"
          onChange={handleInputFiles}
          className="form-input"
          required
          multiple
        />
        <small style={{color: "#6b6b6b" }}>Upload a PDF document.</small>
      </div>

      <div>
        <label className="form-label">Category</label>
        <select
          name="category"
          id="category"
          className="form-input"
          value={product.category}
          onChange={handleInput}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {product.category && (
        <div>
          <label className="form-label">Sub Category</label>
          <select
            name="subCategory"
            id="subCategory"
            className="form-input"
            value={product.subCategory}
            onChange={handleInput}
            required
          >
            <option value="">Select Sub Category</option>
            {subCategories[product.category]?.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit" className="submit-button">
        Add Product
      </button>
    </form>
  </div>
  );
};

export default AddProducts;
