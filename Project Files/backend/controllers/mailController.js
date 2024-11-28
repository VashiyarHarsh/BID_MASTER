const express = require('express');
const User = require('../models/users_db');
const { sendMail, verifyOTP } = require('../utils/mail'); 
const { createTokenForUser } = require('../utils/authentication');

const forgotPassword = async (req, res) => {
    const email = req.body.email || (req.user ? req.user.email : '');
    res.send(email);
}

const sendOTP = async (req, res) => {
    // const { email } = req.body;
    console.log("Request aa geli hai!");
    try {
        console.log("Apun try block me hai!");
        await sendMail(req, res);
        res.send('OTP sent successfully.');
    } catch (error) {
        res.status(500).send('Error sending OTP, please try again.');
    }
}

const OTPverify = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const verification = verifyOTP(email, otp);
    if (verification.valid) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send('User not found.');
            }
            user.password = newPassword; 
            await user.save();
            const token = createTokenForUser(user);
            res.cookie('token', token).send('Password updated successfully.');
        } catch (error) {
            console.error('Error during password update:', error); 
            res.status(500).send('Error updating password.');
        }
    } else {
        console.log('OTP verification failed:', verification.message);  
        res.status(400).send(verification.message);
    }
}

const handleVerifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const verification = verifyOTP(email, otp);
    if (verification.valid) {
        res.send('OTP verified successfully.');
    } else {
        res.status(400).send(verification.message);
    }
}

const handleResetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    console.log(`Email ${email} and new password ${newPassword}`);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        user.password = newPassword; // Update the password
        await user.save();
        const token = createTokenForUser(user); // Generate a new token
        // res.cookie('token', token).send('Password updated successfully.');
        res.cookie('token', token).status(200).json({ message: 'Password updated successfully.', token, success: true });
    } catch (error) {
        console.error('Error during password update:', error);
        res.status(500).send('Error updating password.');
    }
}

module.exports = { 
    forgotPassword, 
    sendOTP, 
    OTPverify,
    handleVerifyOTP,
    handleResetPassword
};