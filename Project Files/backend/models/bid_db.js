const mongoose = require('mongoose');

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
module.exports = mongoose.model('bid_db', BidSchema);
