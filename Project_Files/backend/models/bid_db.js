const mongoose = require('mongoose');

//Collections will be created in AuctionDB................
//CONNECTION SETUP...
//Link to be changed later -------------->>>
const auctionDB = mongoose.createConnection('mongodb+srv://Nirva:1234@cluster0.bi6ih.mongodb.net/auctionDB?retryWrites=true&w=majority')
auctionDB.on('connected', () => {
    console.log("Connected to auctionDB successfully.");
});

auctionDB.on('error', (err) => {
    console.error("Error connecting to auctionDB:", err);
});
//SCHEMA............
const BidSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true // Ensure that only one user per email 
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    BidAmt: {
        type: Number,
        required: true
    }
});

// Export the Bidder model
module.exports = {
    auctionDB,
    BidSchema,
};

