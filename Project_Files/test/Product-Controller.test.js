
const Product = require("../backend/models/product_db");
const Category = require("../backend/models/categories_db");
const User = require("../backend/models/users_db");
const { uploadOnCloudinary } = require("../backend/utils/cloudinary");
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { 
    addProduct, 
    getProductsBySearch, 
    getLatestCreatedProducts, 
    getOldestCreatedProducts, 
    getProductsByReservePriceRange,
    verifyProduct,
    removeProduct,
    getUnverifiedProducts
} = require('../backend/controllers/Products-controller');








describe('Product Controller', () => {
    let productFindStub, productCreateStub, userFindByIdStub, categoryFindOneStub, uploadStub,productFindByIdAndDeleteStub;
    let req, res;
  
    beforeEach(() => {
      productFindStub = sinon.stub(Product, 'find');
      productCreateStub = sinon.stub(Product, 'create');
      userFindByIdStub = sinon.stub(User, 'findById');
      categoryFindOneStub = sinon.stub(Category, 'findOne');
      uploadStub = sinon.stub().resolves({ url: 'test-url' });
      productFindByIdAndDeleteStub = sinon.stub(Product, 'findByIdAndDelete');
  
      req = {
        body: { 
            category: 'Test Category', 
            subCategory: 'Test Subcategory',
            productName: 'Test Product'
        },
        params: {},
        files: {
            productImagesURL: [{ path: '' }],
            certifications: [{ path: '' }]
        },
        user: { id: 'user123' }
    };

    res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        send: sinon.stub()
    };
});
    afterEach(() => {
      sinon.restore();
    });
  
    describe('addProduct', () => {
      it('should add a product successfully', async () => {
        const mockCategory = { 
          subcategories: [{ 
            name: 'Test Subcategory', 
            items: [] 
          }], 
          save: sinon.stub() 
        };
        const mockUser = { 
          unsoldItems: [], 
          save: sinon.stub() 
        };
        const mockProduct = { _id: 'product123' };
  
        userFindByIdStub.resolves(mockUser);
        categoryFindOneStub.resolves(mockCategory);
        productCreateStub.resolves(mockProduct);
  
        await addProduct(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(productCreateStub.calledOnce).to.be.true;
      });
  
      it('should return 400 if no product images', async () => {
        req.files.productImagesURL = [];
  
        await addProduct(req, res);
  
        expect(res.status.calledWith(400)).to.be.true;
      });
    });
  
    describe('getProductsBySearch', () => {
      it('should fetch products by name', async () => {
        req.params.name = 'Test Product';
        productFindStub.resolves([{ productName: 'Test Product' }]);
  
        await getProductsBySearch(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
      });
    });
  
    
    
  
    describe('getProductsByReservePriceRange', () => {
      it('should fetch products within price range', async () => {
        req.params = { min: '100', max: '500' };
        productFindStub.resolves([{ reservePrice: 250 }]);
  
        await getProductsByReservePriceRange(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
      });
    });
  
    describe('verifyProduct', () => {
      it('should verify a product', async () => {
        const mockProduct = { 
          _id: 'product123', 
          productStatus: 'pending',
          save: sinon.stub() 
        };
        req.params.productId = 'product123';
        
        Product.findById = sinon.stub().resolves(mockProduct);
  
        await verifyProduct(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(mockProduct.productStatus).to.equal('verified');
      });
  
      it('should return 404 if product not found', async () => {
        req.params.productId = 'nonexistent';
        Product.findById = sinon.stub().resolves(null);
  
        await verifyProduct(req, res);
  
        expect(res.status.calledWith(404)).to.be.true;
      });
    });
    describe('removeProduct', () => {
      it('should successfully remove a product', async () => {
          const mockProduct = {
              _id: 'product123',
              seller: 'seller123',
              category: 'Test Category',
              subCategory: 'Test Subcategory'
          };
          const mockSeller = {
              unsoldItems: ['product123'],
              save: sinon.stub().resolves()
          };
          const mockCategory = {
              subcategories: [{
                  name: 'Test Subcategory',
                  items: ['product123']
              }],
              save: sinon.stub().resolves()
          };

          req.params.productId = 'product123';
          Product.findById = sinon.stub().resolves(mockProduct);
          userFindByIdStub.resolves(mockSeller);
          categoryFindOneStub.resolves(mockCategory);
          productFindByIdAndDeleteStub.resolves(mockProduct);

          await removeProduct(req, res);

          expect(res.status.calledWith(200)).to.be.true;
          expect(res.send.calledWith({
              message: "Product removed successfully",
              product: mockProduct
          })).to.be.true;
      });

      it('should return 404 if product not found', async () => {
          req.params.productId = 'nonexistent';
          Product.findById = sinon.stub().resolves(null);

          await removeProduct(req, res);

          expect(res.status.calledWith(404)).to.be.true;
          expect(res.send.calledWith("Product not found")).to.be.true;
      });

      it('should return 404 if seller not found', async () => {
          const mockProduct = {
              _id: 'product123',
              seller: 'seller123'
          };
          req.params.productId = 'product123';
          Product.findById = sinon.stub().resolves(mockProduct);
          userFindByIdStub.resolves(null);

          await removeProduct(req, res);

          expect(res.status.calledWith(404)).to.be.true;
          expect(res.send.calledWith("Seller not found")).to.be.true;
      });

      it('should return 404 if category not found', async () => {
          const mockProduct = {
              _id: 'product123',
              seller: 'seller123',
              category: 'Nonexistent Category'
          };
          const mockSeller = {
              unsoldItems: ['product123'],
              save: sinon.stub().resolves()
          };

          req.params.productId = 'product123';
          Product.findById = sinon.stub().resolves(mockProduct);
          userFindByIdStub.resolves(mockSeller);
          categoryFindOneStub.resolves(null);

          await removeProduct(req, res);

          expect(res.status.calledWith(404)).to.be.true;
          expect(res.send.calledWith("Category not found")).to.be.true;
      });

      it('should return 404 if subcategory not found', async () => {
          const mockProduct = {
              _id: 'product123',
              seller: 'seller123',
              category: 'Test Category',
              subCategory: 'Nonexistent Subcategory'
          };
          const mockSeller = {
              unsoldItems: ['product123'],
              save: sinon.stub().resolves()
          };
          const mockCategory = {
              subcategories: [],
              save: sinon.stub().resolves()
          };

          req.params.productId = 'product123';
          Product.findById = sinon.stub().resolves(mockProduct);
          userFindByIdStub.resolves(mockSeller);
          categoryFindOneStub.resolves(mockCategory);

          await removeProduct(req, res);

          expect(res.status.calledWith(404)).to.be.true;
          expect(res.send.calledWith("Subcategory not found")).to.be.true;
      });
  });

  describe('getUnverifiedProducts', () => {
      it('should fetch all unverified products', async () => {
          const mockUnverifiedProducts = [
              { _id: 'product1', productStatus: 'unverified' },
              { _id: 'product2', productStatus: 'unverified' }
          ];
          
          productFindStub.resolves(mockUnverifiedProducts);

          await getUnverifiedProducts(req, res);

          expect(productFindStub.calledWith({ productStatus: "unverified" })).to.be.true;
          expect(res.status.calledWith(200)).to.be.true;
          expect(res.json.calledWith(mockUnverifiedProducts)).to.be.true;
      });

      it('should handle errors when fetching unverified products', async () => {
          const error = new Error('Database error');
          productFindStub.rejects(error);

          await getUnverifiedProducts(req, res);

          expect(res.status.calledWith(500)).to.be.true;
          expect(res.json.calledWith({
              message: "Failed to fetch products",
              error: error.message
          })).to.be.true;
      });
  });
});
