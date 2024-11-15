const express = require("express");
const app = express.Router();
const { handleUserSignUp, handleUserSignIn } = require("../controllers/userController");

app.post("/signup", handleUserSignUp);

app.post("/signin", handleUserSignIn);

module.exports = app;