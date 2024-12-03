const express = require("express");

const app = express.Router();

const { 
    handleUserSignUp, 
    handleUserSignIn,
    getUserById 
} = require("../controllers/userController");

const { upload } = require("../middlewares/storeFiles.middleware");

app.post("/signup", upload.single("profileImageURL"), handleUserSignUp);

app.post("/signin", handleUserSignIn);

app.get("/:id", getUserById);

module.exports = app;