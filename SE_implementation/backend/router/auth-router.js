const express = require("express")
const app = express()
const router = express.Router();

app.get("/",(req,res)=>{
    res.status(200).send('Welcome');
 });

 app.post("/AddProducts",(req,res)=>{
    res.status(200).send("ProductAdded");
 })

 module.exports = router

 