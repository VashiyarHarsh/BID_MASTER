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
    finalPrice: {
        type: Number,
        default: 0
    },
    certifications: {
        type: [String],
        required: true,
    },
    productImagesURL: {
        type: [String],
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    productStatus: {
        type: String,
        enum: ["unverified", "verified", "sold"],
        default: "unverified"
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

const Product = new mongoose.model('Product', productSchema);

module.exports = Product
