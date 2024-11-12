const Category = require('../models/categories_db');

async function getFilteredItemsByCategory(req, res) {
    const { cname } = req.params;
    try {
        const category = await Category.findOne({ name: cname });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const items = category.subcategories.flatMap(subcategory => subcategory.items);
        return res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function getFilteredItemsBySubcategory(req, res) {
    const { cname, sname } = req.params;
    try {
        const category = await Category.findOne({ name: cname });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const subcategory = category.subcategories.find(subcategory => subcategory.name === sname);
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        const items = subcategory.items || [];
        return res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getFilteredItemsByCategory,
    getFilteredItemsBySubcategory
};
