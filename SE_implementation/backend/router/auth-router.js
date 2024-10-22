const express = require("express")
const app = express()
const router = express.Router();

app.get("/",(req,res)=>{
    res.status(200).send('Welcome');
 });

 module.exports = router
