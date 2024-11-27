const express = require('express');
const { forgotPassword, sendOTP, OTPverify, handleVerifyOTP, handleResetPassword } = require('../controllers/mailController');
const app = express.Router();

app.get('/forgotpassword', forgotPassword);

app.post('/sendotp', sendOTP);

//app.post('/verifyotp', OTPverify);

app.post('/verifyotp', handleVerifyOTP);

app.post('/resetpassword', handleResetPassword);

module.exports = app;