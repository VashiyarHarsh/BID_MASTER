const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    subcategories: [
        {
            name: { 
                type: String, 
                required: true 
            },
            items: [{type: mongoose.Schema.ObjectId}]
        }
    ]
});

const Category = mongoose.model('Category', categorySchema);

const categories = [
    {
        name: 'Collectibles',
        subcategories: [
            { name: 'Coins & Currency', items: [] },
            { name: 'Stamps', items: [] },
            { name: 'Sports Memorabilia', items: [] },
            { name: 'Comics & Trading Cards', items: [] }
        ]
    },
    {
        name: 'Art & Antiques',
        subcategories: [
            { name: 'Fine Art (Paintings, Sculptures)', items: [] },
            { name: 'Antiques (Furniture, Collectibles)', items: [] },
            { name: 'Decorative Art', items: [] },
            { name: 'Vintage Jewelry', items: [] }
        ]
    },
    {
        name: 'Jewelry & Watches',
        subcategories: [
            { name: 'Fine Jewelry (Gold, Diamonds)', items: [] },
            { name: 'Luxury Watches', items: [] },
            { name: 'Costume Jewelry', items: [] },
            { name: 'Gemstones', items: [] }
        ]
    },
    {
        name: 'Furniture & Home Decor',
        subcategories: [
            { name: 'Vintage Furniture', items: [] },
            { name: 'Designer Furniture', items: [] },
            { name: 'Rugs & Carpets', items: [] },
            { name: 'Home Appliances', items: [] }
        ]
    },
    {
        name: 'Books & Manuscripts',
        subcategories: []
    },
    {
        name: 'Wine & Spirits',
        subcategories: [
            { name: 'Fine Wines', items: [] },
            { name: 'Rare Whiskeys', items: [] },
            { name: 'Vintage Spirits', items: [] },
            { name: 'Champagne', items: [] }
        ]
    },
    {
        name: 'Musical Instruments',
        subcategories: [
            { name: 'Musical Instruments', items: [] },
            { name: 'Vintage Records', items: [] }
        ]
    }
];

async function initializeCategories() {
    try {
        const existingCategories = await Category.find();
        if (existingCategories.length === 0) {
            await Category.insertMany(categories);
            console.log('Categories added successfully');
        } else {
            console.log('Categories already exist, skipping initialization');
        }
    } catch (err) {
        console.error('Error adding categories:', err);
    }
}

initializeCategories();

module.exports = Category;