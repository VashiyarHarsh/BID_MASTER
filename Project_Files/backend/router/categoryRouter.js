const express = require('express');

const app = express.Router();

const { 
    getFilteredItemsByCategory, 
    getFilteredItemsBySubcategory
} = require('../controllers/categoryController.js');

app.get('/:cname', getFilteredItemsByCategory);

app.get('/:cname/:sname', getFilteredItemsBySubcategory);

module.exports = app;
