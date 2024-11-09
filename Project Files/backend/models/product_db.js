const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, "PLEASE ENTER PRODUCT NAME"]
    },
    productDescription: {
        type: String,
        required: [true, "PLEASE ENTER DESCRIPTION AN ITEM"]
    
    },
    dimensions: {
        type: String,
        required: [false, "PLEASE ENTER DIMENSION"]
    },
    weight: {
        type: Number,
        required: [false, "PLEASE ENTER WEIGHT"]
    },
    yearOfManufacture: {
        type: Number,
        required: [false, "PLEASE ENTER MANUFACTURING DATE"]
    },
    manufacturer: {
        type: String,
        required: [false, "PLEASE ENTER MANUFCTURER NAME"]
    },
    reservePrice: {
        type: Number,
        default: 0
    },
    certifications: {
        type: [String], // Array of image URLs or file paths
        required: true,
    },
    productImagesURL: {
        type: [String], // Array of image URLs or file paths
        required: true
    },
    category: {
        type: String,
        required: [true, "PLEASE SELECT CATEGORY"]
    },
    subCategory:{
        type: String,
        required: [true, "PLEASE SELECT SUBCATEGORY"]
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // seller: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'USER'
    // },
    // bids: [{
    //     bidder: { 
    //         type: mongoose.Schema.ObjectId, 
    //         ref: 'USER' 
    //     },
    //     bid: Number,
    //     time: Date
    // }]
})

// module.exports = mongoose.model('Product', productSchema);

const Product = new mongoose.model('Product', productSchema);
module.exports = Product
