// UNCOMMENT THE CODE BEFORE USING.........



// const {User,UserDBConnection} = require("../models/users_db");
// const { auctionDB, BidSchema } = require("../models/bid_db"); 
// // To get Bid Schema.......
// const getDynamicBidModel = (collectionName)=>{
//     return mongoose.models[collectionName] || mongoose.model(collectionName, BidSchema)
//   }
//   //Place a bid------------------------->
//   app.post("/placeBid", async (req, res) => {
//     try {
//         const { productName, userEmail, BidAmt } = req.body;
  
//         if (!productName || !userEmail) {
//             return res.status(400).json({ error: "Missing required fields: productName or userEmail." });
//         }
  
//         // Dynamically determine bid amount if not provided
//         const bidAmount = BidAmt
  
//         // Collection name for the product
//         const collectionName = `bids_product_${productName.replace(/\s+/g, "_").toLowerCase()}`;
  
//         // Load the bid model dynamically
//         const BidProduct = getDynamicBidModel(collectionName);
  
//         // Check if the user already placed a bid
//         const existingBid = await BidProduct.findOne({ userEmail });
//         if (existingBid) {
//             // Update existing bid
//             existingBid.BidAmt = bidAmount;
//             existingBid.timestamp = new Date();
//             await existingBid.save();
//             return res.status(200).json({ message: "Bid updated successfully." });
//         }
  
//         // Create a new bid entry
//         const newBid = new BidProduct({
//             userEmail,
//             BidAmt: bidAmount,
//         });
  
//         await newBid.save();
//         return res.status(201).json({ message: "Bid placed successfully." });
//     } catch (error) {
//         console.error("Error placing bid:", error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
//   });
    
  
//    //Bid enrty placed successfully.....
//    //-------------------------------------------------------------------------------------------------------------
//    //Timer-Out

//    //UPDATE DATABASE---------->>>

//    //Update USER Database by adding soldprice, and setting the status to be sold
//    // Function to fetch the highest bid for a given collection
// const getHighestBid = async (collectionName) => {
//     try {
//         // Ensure auctionDB connection is ready
//         if (!auctionDB) {
//             return { error: "Auction database is not connected." };
//         }

//         // Dynamically create the model for the specified collection
//         const BidCollection = auctionDB.model(collectionName, BidSchema);

//         // Fetch the highest bid from the collection and sort by BidAmt
//         const highestBid = await BidCollection.find().sort({ BidAmt: -1 }).limit(1);

//         if (highestBid.length === 0) {
//             return { error: `No bids found in collection "${collectionName}".` };
//         }

//         return { highestBid: highestBid[0].BidAmt, bidDetails: highestBid[0] };
//     } catch (error) {
//         console.error(`Error fetching highest bid for collection "${collectionName}":`, error.message);
//         return { error: 'An error occurred while fetching the highest bid.' };
//     }
// };
// //Using the above fetched data update the user database---------------------------------------------------------------------
// //connection with user database is not done.................
// const User = mongoose.model('User', userSchema); // Assuming your schema is compiled into the User model

// app.post('/add-to-bought', async (req, res) => {
//     const { userEmail, productName } = req.body;

//     if (!userEmail || !productName) {
//         return res.status(400).json({ error: 'userEmail and productName are required' });
//     }

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email: userEmail });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Add productName to boughtItems array if not already present
//         if (!user.boughtItems.includes(productName)) {
//             const updatedUser = await updateUser(userEmail, { boughtItems: [...user.boughtItems, productName] });
//             return res.status(200).json({ message: 'Product added to boughtItems successfully', user: updatedUser });
//         } else {
//             return res.status(200).json({ message: 'Product already exists in boughtItems' });
//         }
//     } catch (error) {
//         console.error('Error updating boughtItems:', error.message);
//         return res.status(500).json({ error: 'An error occurred while updating boughtItems' });
//     }
// });

   


  