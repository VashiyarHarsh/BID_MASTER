const express = require("express");
const router = express.Router();
const { addProduct } = require("../controllers/Products-controller");
const { upload } = require("../middlewares/storeFiles.middleware");


router.post("/addProducts", upload.fields([
    {
        name:"certifications",
        maxCount:3
    },
    {
        name:"productImagesURL",
        maxCount:5
    }
]), addProduct);

module.exports = router;
