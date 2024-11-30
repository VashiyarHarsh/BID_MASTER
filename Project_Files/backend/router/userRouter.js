const express = require("express");
const app = express.Router();
const { handleUserSignUp, handleUserSignIn, handleUserSignOut } = require("../controllers/userController");
const { upload } = require("../middlewares/storeFiles.middleware");

app.post("/signup", upload.single("profileImageURL"), handleUserSignUp);

app.post("/signin", handleUserSignIn);

app.post("/signout", handleUserSignOut);

module.exports = app;