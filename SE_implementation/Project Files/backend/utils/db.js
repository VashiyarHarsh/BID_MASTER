//DATABASE CONNECTION WILL BE SET UP
const mongoose = require("mongoose")

// const URI = "mongodb+srv://Nirva-Patel:Nirva%401234@cluster0.74lmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const URI = "mongodb+srv://nirvapatel84:rMYA8WO9LcpG9tNG@signup.4shin.mongodb.net/?retryWrites=true&w=majority&appName=SignUp"
//mongoose.connect(URI)

const connectDb = async()=>{
    try{
       await mongoose.connect(URI);
       console.log("Connected succesfully to DB")
    }catch(error){
        console.error("Database Connection Failed")
        process.exit(1);
    }
};

connectDb();

module.exports = connectDb
