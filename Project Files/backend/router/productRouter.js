const express = require("express");
const router = express.Router();
const { checkForAuthenticationCookie, restrictTo } = require("../utils/authentication");
const { addProduct, getProductsBySearch, getLatestCreatedProducts, getOldestCreatedProducts, getProductsByReservePriceRange, verifyProduct, removeProduct, getUnverifiedProducts } = require("../controllers/Products-controller");
const { upload } = require("../middlewares/storeFiles.middleware");

router.get("/search/:name", getProductsBySearch);
router.get("/", getLatestCreatedProducts);
router.get("/oldest", getOldestCreatedProducts);
router.get("/range/:min/:max", getProductsByReservePriceRange);
// router.patch("/verify/:productId", checkForAuthenticationCookie("token"), restrictTo(["Admin"]), verifyProduct);
// router.delete("/remove/:productId", checkForAuthenticationCookie("token"), restrictTo(["Admin"]), removeProduct);
// router.get("/unverified", checkForAuthenticationCookie("token"), restrictTo(["Admin"]), getUnverifiedProducts);
router.get("/unverified", getUnverifiedProducts);
router.patch("/verify/:productId", verifyProduct);
router.delete("/remove/:productId", removeProduct);

router.post("/addProducts", checkForAuthenticationCookie("token"), upload.fields([
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
