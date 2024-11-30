const express = require('express');
const { getFilteredItemsByCategory, getFilteredItemsBySubcategory } = require('../controllers/categoryController.js');
const app = express.Router();

app.get('/:cname', getFilteredItemsByCategory);

app.get('/:cname/:sname', getFilteredItemsBySubcategory);

module.exports = app;
