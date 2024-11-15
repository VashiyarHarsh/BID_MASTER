const express = require('express');
const { forgotPassword, sendOTP, OTPverify } = require('../controllers/mailController');
const app = express.Router();

app.get('/forgotpassword', forgotPassword);

app.post('/sendotp', sendOTP);

app.post('/verifyotp', OTPverify);

module.exports = app;