const express = require("express");
const router = express.Router();
const { addProduct, getProductsBySearch, getLatestCreatedProducts, getOldestCreatedProducts, getProductsByReservePriceRange } = require("../controllers/Products-controller");
const { upload } = require("../middlewares/storeFiles.middleware");

router.get("/search/:name", getProductsBySearch);
router.get("/", getLatestCreatedProducts);
router.get("/oldest", getOldestCreatedProducts);
router.get("/range/:min/:max", getProductsByReservePriceRange);

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
