const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const { uploadOnCloudinary } = require("../backend/utils/cloudinary");
const { setCookie, clearCookie } = require('../backend/utils/authentication');
const {  handleUserSignUp,
    handleUserSignIn,
    handleUserSignOut} =require('../backend/controllers/userController');
const User = require('../backend/models/users_db');


describe('userController tests', () => {
    let req, res;
    
    beforeEach(() => {
        req = {
            body: {}
        };
        
        res = {
            status: sinon.stub().returnsThis(),
            send: sinon.stub(),
            cookie: sinon.stub(),
            clearCookie: sinon.stub()
        };
    });

    describe('Sign Up', () => {
        it('should successfully create a new user', async () => {
            req.body = {
                fullName: 'Test User',
                userName: 'testuser',
                email: 'newuser@test.com',
                password: 'password123'
            };

            await handleUserSignUp(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.send.calledWith(req.body)).to.be.true;
        });

        it('should return 400 if email already exists', async () => {
            req.body = {
                fullName: 'Test User',
                userName: 'testuser',
                email: 'existing@test.com',
                password: 'password123'
            };

            await handleUserSignUp(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.send.calledWith('Email already in use!')).to.be.true;
        });
    });

    describe('Sign In', () => {
        it('should successfully sign in user with correct credentials', async () => {
            req.body = {
                email: 'test@test.com',
                password: 'password123'
            };

            await handleUserSignIn(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.cookie.calledWith('token', 'mock-token')).to.be.true;
            expect(res.send.calledWith('done che')).to.be.true;
        });

        it('should return 401 for incorrect credentials', async () => {
            req.body = {
                email: 'test@test.com',
                password: 'wrongpassword'
            };

            await handleUserSignIn(req, res);

            expect(res.status.calledWith(401)).to.be.true;
            expect(res.send.calledWith('Invalid email or password')).to.be.true;
        });
    });

    describe('Sign Out', () => {
        it('should successfully sign out user', async () => {
            await handleUserSignOut(req, res);

            expect(res.clearCookie.calledWith('token')).to.be.true;
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.send.calledWith('Logged out successfully')).to.be.true;
        });
    });
});