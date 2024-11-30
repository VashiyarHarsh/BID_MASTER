// UNCOMMENT THE CODE BEFORE USING.........
const product = require("./models/Product_db")
const {User,UserDBConnection} = require("../models/users_db");
const { auctionDB, BidSchema } = require("../models/bid_db"); 
// To get Bid Schema.......
const getDynamicBidModel = (collectionName)=>{
    return mongoose.models[collectionName] || mongoose.model(collectionName, BidSchema)
  }
  //Place a bid------------------------->
  app.post("/placeBid", async (req, res) => {
    try {
        const { productName, userEmail, BidAmt } = req.body;
  
        if (!productName || !userEmail) {
            return res.status(400).json({ error: "Missing required fields: productName or userEmail." });
        }
  
        // Dynamically determine bid amount if not provided
        const bidAmount = BidAmt
  
        // Collection name for the product
        const collectionName = `bids_product_${productName.replace(/\s+/g, "_").toLowerCase()}`;
  
        // Load the bid model dynamically
        const BidProduct = getDynamicBidModel(collectionName);
  
        // Check if the user already placed a bid
        const existingBid = await BidProduct.findOne({ userEmail });
        if (existingBid) {
            // Update existing bid
            existingBid.BidAmt = bidAmount;
            existingBid.timestamp = new Date();
            await existingBid.save();
            return res.status(200).json({ message: "Bid updated successfully." });
        }
  
        // Create a new bid entry
        const newBid = new BidProduct({
            userEmail,
            BidAmt: bidAmount,
        });
  
        await newBid.save();
        return res.status(201).json({ message: "Bid placed successfully." });
    } catch (error) {
        console.error("Error placing bid:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
  });
    
  
   //Bid enrty placed successfully.....
   //-------------------------------------------------------------------------------------------------------------
   //Timer-Out

   //UPDATE DATABASE---------->>>

   //Update USER Database by adding soldprice, and setting the status to be sold
   // Function to fetch the highest bid for a given collection
const getHighestBid = async (collectionName) => {
    try {
        // Ensure auctionDB connection is ready
        if (!auctionDB) {
            return { error: "Auction database is not connected." };
        }

        // Dynamically create the model for the specified collection
        const BidCollection = auctionDB.model(collectionName, BidSchema);

        // Fetch the highest bid from the collection and sort by BidAmt
        const highestBid = await BidCollection.find().sort({ BidAmt: -1 }).limit(1);

        if (highestBid.length === 0) {
            return { error: `No bids found in collection "${collectionName}".` };
        }

        return { highestBid: highestBid[0].BidAmt, bidDetails: highestBid[0] };
    } catch (error) {
        console.error(`Error fetching highest bid for collection "${collectionName}":`, error.message);
        return { error: 'An error occurred while fetching the highest bid.' };
    }
};

//TESTING THE CODE.......
//Example usage
// (async () => {
//     const collectionName = "bids_product_wine1234"; // Replace with the actual collection name
//     const result = await getHighestBid(collectionName);
//     if (result.error) {
//         console.error(result.error);
//     } else {
//         console.log(`Highest BidAmt: ${result.highestBid}`, result.bidDetails);
//     }
// })();

//using the highest bid update the user database :
//Take the email and add the product to boughtItems array
// POST route to update user's bought items
//connection with user database is not done.................
const User = mongoose.model('User', userSchema); // Assuming your schema is compiled into the User model

app.post('/update-bought-items', async (req, res) => {
    try {
        // Ensure userDB connection is ready
        if (!user_db) {
            return res.status(500).json({ error: "User database is not connected." });
        }

        // Extract userEmail and productId from the request body
        const { userEmail, productId } = req.body;

        if (!userEmail || !productId) {
            return res.status(400).json({ error: "userEmail and productId are required." });
        }

        // Dynamically create or use the User model
        const User = user_db.model("User", userSchema);

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: `User with email "${userEmail}" not found.` });
        }

        // Check if the product is already in the boughtItems array
        if (user.boughtItems.includes(productId)) {
            return res.status(200).json({ message: `Product "${productId}" is already in the user's bought items.` });
        }

        user.boughtItems.push(productId);

        await user.save();

        return res.status(200).json({ message: `User "${user.fullName}"'s bought items successfully updated.` });
    } catch (error) {
        console.error("Error updating bought items:", error.message);
        return res.status(500).json({ error: "An error occurred while updating bought items." });
    }
});

//Update product database.......
//take parameters as soldPrice and productName , update the soldprice from null to price given in
// parameters and update the productStatus to sold.

app.post('/updateProductDB', async (req, res) => {
    const { productName, soldPrice } = req.body;  // Take parameters from the request body

    if (!productName || !soldPrice) {
        return res.status(400).json({ error: "Product name and sold price are required." });
    }

    try {
        // Ensure the productDB connection is ready
        if (!mongoose.connection.readyState) {
            return res.status(500).json({ error: "Product database is not connected." });
        }

        // Find the product by productName
        const product = await Product.findOne({ productName });

        if (!product) {
            return res.status(404).json({ error: `Product with name "${productName}" not found.` });
        }

        // Check if the soldPrice is null, indicating it hasn't been sold yet
        if (product.soldPrice !== null) {
            return res.status(400).json({ message: `Product "${productName}" has already been sold.` });
        }

        // Update the soldPrice and productStatus fields
        product.soldPrice = soldPrice;
        product.productStatus = "sold";

        // Save the updated product document
        await product.save();

        return res.status(200).json({ message: `Product "${productName}" successfully updated with soldPrice: ${soldPrice}.` });

    } catch (error) {
        console.error("Error updating product status:", error.message);
        return res.status(500).json({ error: "An error occurred while updating the product status." });
    }
});









   


  