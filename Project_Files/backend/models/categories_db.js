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
            { name: 'Paintings', items: [] },
            { name: 'Sculptures', items: [] },
            { name: 'Art Pieces', items: [] }
        ]
    },
    {
        name: 'Jewellery & Watches',
        subcategories: [
            { name: 'Fine Jewellery', items: [] },
            { name: 'Gemstones', items: [] },
            { name: 'Luxury Watches', items: [] },
            { name: 'Vintage Watches', items: [] }
        ]
    },
    {
        name: 'Furniture',
        subcategories: [
            { name: 'Vintage Furniture', items: [] },
            { name: 'Designer Furniture', items: [] },
            { name: 'Rugs-Carpets', items: [] }
        ]
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
        name: 'Books & Musical Instruments',
        subcategories: [
            {name: 'Vintage Records', item: []},
            {name: 'Manuscripts', item: []}
        ]
    },
];

async function initializeCategories() {
    try {
        const existingCategories = await Category.find();
        if (existingCategories.length === 0) {
            await Category.insertMany(categories);
        } 
        else {
            console.log('Categories already exist in the database');
        }
    } 
    catch (err) {
        console.error('Error adding categories:', err);
    }
}

initializeCategories();

module.exports = Category;