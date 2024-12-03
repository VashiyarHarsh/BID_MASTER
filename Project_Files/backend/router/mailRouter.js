const express = require('express');

const app = express.Router();

const { 
    forgotPassword, 
    sendOTP, 
    handleVerifyOTP, 
    handleResetPassword 
} = require('../controllers/mailController');

app.get('/forgotpassword', forgotPassword);

app.post('/sendotp', sendOTP);

app.post('/verifyotp', handleVerifyOTP);

app.post('/resetpassword', handleResetPassword);

module.exports = app;