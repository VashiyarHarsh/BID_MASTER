const express = require("express")
const app = express()
const router = express.Router();

router.get("/",(req,res)=>{
    res.status(200).send('Welcome');
 });

router.post("/AddProducts",(req,res)=>{
    res.status(200).send("ProductAdded");
 })

 router.post("/Profile",(req,res)=>{
    res.status(200).send("Profile Updated!!!");
 })

 module.exports = router

 
 