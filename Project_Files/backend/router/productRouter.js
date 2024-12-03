const express = require("express");

const router = express.Router();

const { 
    checkForAuthorizationHeader, 
    checkAdmin 
} = require("../utils/authentication");

const { 
    addProduct, 
    getProductsBySearch, 
    getLatestCreatedProducts, 
    getOldestCreatedProducts, 
    getProductsByReservePriceRange, 
    verifyProduct, 
    removeProduct, 
    getUnverifiedProducts 
} = require("../controllers/Products-controller");

const { upload } = require("../middlewares/storeFiles.middleware");

router.post("/addProducts", checkForAuthorizationHeader, upload.fields([
    {
        name:"certifications",
        maxCount:3
    },
    {
        name:"productImagesURL",
        maxCount:5
    }
]), addProduct);

router.get("/", getLatestCreatedProducts);

router.get("/oldest", getOldestCreatedProducts);

router.get("/search/:name", getProductsBySearch);

router.get("/range/:min/:max", getProductsByReservePriceRange);

router.get("/unverified", checkForAuthorizationHeader, checkAdmin, getUnverifiedProducts);

router.patch("/verify/:productId", checkForAuthorizationHeader, checkAdmin, verifyProduct);

router.delete("/remove/:productId", checkForAuthorizationHeader, checkAdmin, removeProduct);

module.exports = router;