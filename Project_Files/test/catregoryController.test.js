const Category = require('../backend/models/categories_db');
const chai = require('chai');
const { expect} = chai;
const sinon = require('sinon');
const User = require('../backend/models/users_db');
const {getFilteredItemsByCategory,getFilteredItemsBySubcategory} = require('../backend/controllers/categoryController');


describe('Category Controller', () => {
    let findOneStub;
    let req, res;

    beforeEach(() => {
     
        req = {
            params: {}
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        findOneStub = sinon.stub(Category, 'findOne');
    });

    afterEach(() => {
      
        findOneStub.restore();
    });

    describe('getFilteredItemsByCategory', () => {
        it('should return items when category exists', async () => {
          
            const mockCategory = {
                name: 'Collectibles',
                subcategories: [
                    { 
                        name: 'Coins & Currency', 
                        items: [{ _id: 'item1' }, { _id: 'item2' }] 
                    },
                    { 
                        name: 'Stamps', 
                        items: [{ _id: 'item3' }] 
                    }
                ]
            };

            
            findOneStub.resolves(mockCategory);

           
            req.params.cname = 'Collectibles';

            
            await getFilteredItemsByCategory(req, res);

           
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.json, [
                { _id: 'item1' }, 
                { _id: 'item2' }, 
                { _id: 'item3' }
            ]);
        });

        it('should return 404 when category does not exist', async () => {
           
            findOneStub.resolves(null);

            req.params.cname = 'NonExistentCategory';

           
            await getFilteredItemsByCategory(req, res);

            
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.json, { message: "Category not found" });
        });

        it('should handle server errors', async () => {
            
            findOneStub.throws(new Error('Database connection error'));

            
            req.params.cname = 'Collectibles';

            
            const consoleErrorStub = sinon.stub(console, 'error');

            await getFilteredItemsByCategory(req, res);

           
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledWith(res.json, { message: "Server error" });

           
            consoleErrorStub.restore();
        });
    });

    describe('getFilteredItemsBySubcategory', () => {
        it('should return items when category and subcategory exist', async () => {
            // Mock category with specific subcategory
            const mockCategory = {
                name: 'Collectibles',
                subcategories: [
                    { 
                        name: 'Coins & Currency', 
                        items: [{ _id: 'coin1' }, { _id: 'coin2' }] 
                    },
                    { 
                        name: 'Stamps', 
                        items: [] 
                    }
                ]
            };

            // Setup the stub to return the mock category
            findOneStub.resolves(mockCategory);

            // Set up the request parameters
            req.params.cname = 'Collectibles';
            req.params.sname = 'Coins & Currency';

            // Call the function
            await getFilteredItemsBySubcategory(req, res);

            // Assertions
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.json, [
                { _id: 'coin1' }, 
                { _id: 'coin2' }
            ]);
        });

        it('should return 404 when category does not exist', async () => {
            // Setup the stub to return null (no category found)
            findOneStub.resolves(null);

            // Set up the request parameters
            req.params.cname = 'NonExistentCategory';
            req.params.sname = 'SomeSubcategory';

            // Call the function
            await getFilteredItemsBySubcategory(req, res);

            // Assertions
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.json, { message: "Category not found" });
        });

        it('should return 404 when subcategory does not exist', async () => {
            // Mock category without the specific subcategory
            const mockCategory = {
                name: 'Collectibles',
                subcategories: [
                    { 
                        name: 'Coins & Currency', 
                        items: [] 
                    }
                ]
            };

            // Setup the stub to return the mock category
            findOneStub.resolves(mockCategory);

            // Set up the request parameters
            req.params.cname = 'Collectibles';
            req.params.sname = 'NonExistentSubcategory';

            // Call the function
            await getFilteredItemsBySubcategory(req, res);

            // Assertions
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.json, { message: "Subcategory not found" });
        });

        it('should handle server errors', async () => {
            // Setup the stub to throw an error
            findOneStub.throws(new Error('Database connection error'));

            // Set up the request parameters
            req.params.cname = 'Collectibles';
            req.params.sname = 'Coins & Currency';

            // Spy on console.error
            const consoleErrorStub = sinon.stub(console, 'error');

            // Call the function
            await getFilteredItemsBySubcategory(req, res);

            // Assertions
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledWith(res.json, { message: "Server error" });

            // Restore console.error
            consoleErrorStub.restore();
        });
    });
});
