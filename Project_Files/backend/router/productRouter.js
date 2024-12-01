const express = require("express");
const router = express.Router();
const { checkForAuthorizationHeader, restrictTo } = require("../utils/authentication");
const { addProduct, getProductsBySearch, getLatestCreatedProducts, getOldestCreatedProducts, getProductsByReservePriceRange, verifyProduct, removeProduct, getUnverifiedProducts } = require("../controllers/Products-controller");
const { upload } = require("../middlewares/storeFiles.middleware");

router.get("/search/:name", getProductsBySearch);
router.get("/", getLatestCreatedProducts);
router.get("/oldest", getOldestCreatedProducts);
router.get("/range/:min/:max", getProductsByReservePriceRange);
// router.patch("/verify/:productId", checkForAuthorizationHeader, restrictTo(["Admin"]), verifyProduct);
// router.delete("/remove/:productId", checkForAuthorizationHeader, restrictTo(["Admin"]), removeProduct);
// router.get("/unverified", checkForAuthorizationHeader, restrictTo(["Admin"]), getUnverifiedProducts);
router.get("/unverified", getUnverifiedProducts);
router.patch("/verify/:productId", verifyProduct);
router.delete("/remove/:productId", removeProduct);

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

module.exports = router;
