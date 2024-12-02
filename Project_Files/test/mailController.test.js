const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const { forgotPassword, sendOTP, OTPverify } = require('../backend/controllers/mailController');
const express = require('express');
const User = require('../backend/models/users_db');
const { sendMail, verifyOTP } = require('../backend/utils/mail'); 
const { createTokenForUser } = require('../backend/utils/authentication');


describe('Forgot Password Controller Tests', () => {
    let mockReq, mockRes, mockUser;

    beforeEach(() => {
        mockReq = { body: {}, user: {} };
        mockRes = {
            send: sinon.stub(),
            status: sinon.stub().returnsThis(),
            cookie: sinon.stub().returnsThis(),
        };
        mockUser = { email: 'test@example.com', password: 'oldpassword', save: sinon.stub() };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('forgotPassword', () => {
        it('should send email if email is provided in req.body', async () => {
            mockReq.body.email = 'test@example.com';
            await forgotPassword(mockReq, mockRes);
            expect(mockRes.send.calledWith('test@example.com')).to.be.true;
        });

        it('should send user email if req.user exists', async () => {
            mockReq.body.email = '';
            mockReq.user.email = 'user@example.com';
            await forgotPassword(mockReq, mockRes);
            expect(mockRes.send.calledWith('user@example.com')).to.be.true;
        });
    });

    describe('sendOTP', () => {
        it('should call sendMail and respond with success message', async () => {
            sendMail.resolves();
            mockReq.body.email = 'test@example.com';
            await sendOTP(mockReq, mockRes);
            expect(mockRes.send.calledWith('OTP sent successfully.')).to.be.true;
        });

        it('should handle errors in sendMail and respond with an error message', async () => {
            sendMail.rejects();
            await sendOTP(mockReq, mockRes);
            expect(mockRes.status.calledWith(500)).to.be.true;
            expect(mockRes.send.calledWith('Error sending OTP, please try again.')).to.be.true;
        });
    });

    describe('OTPverify', () => {
        it('should verify OTP and update user password', async () => {
            verifyOTP.returns({ valid: true });
            User.findOne.resolves(mockUser);
            createTokenForUser.returns('mockToken');

            mockReq.body = { email: 'test@example.com', otp: '123456', newPassword: 'newpassword' };
            await OTPverify(mockReq, mockRes);

            expect(mockUser.password).to.equal('newpassword');
            expect(mockUser.save.calledOnce).to.be.true;
            expect(mockRes.cookie.calledWith('token', 'mockToken')).to.be.true;
            expect(mockRes.send.calledWith('Password updated successfully.')).to.be.true;
        });

        it('should return 404 if user is not found', async () => {
            verifyOTP.returns({ valid: true });
            User.findOne.resolves(null);

            mockReq.body = { email: 'notfound@example.com', otp: '123456', newPassword: 'newpassword' };
            await OTPverify(mockReq, mockRes);

            expect(mockRes.status.calledWith(404)).to.be.true;
            expect(mockRes.send.calledWith('User not found.')).to.be.true;
        });

        it('should return 400 for invalid OTP', async () => {
            verifyOTP.returns({ valid: false, message: 'Invalid OTP' });

            mockReq.body = { email: 'test@example.com', otp: 'wrongotp', newPassword: 'newpassword' };
            await OTPverify(mockReq, mockRes);

            expect(mockRes.status.calledWith(400)).to.be.true;
            expect(mockRes.send.calledWith('Invalid OTP')).to.be.true;
        });
    });
});
