require('dotenv').config();
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        //profileImageURL: user.profileImageURL,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

const validateToken = (token) => {
    const payload = JWT.verify(token, secret);
    return payload;
}

const checkForAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next(); 
        }
        try {
            const userPayload = validateToken(tokenCookieValue); 
            req.user = userPayload; 
            res.locals.user = userPayload;
        } 
        catch(error) {
            console.error('Invalid token:', error);
        }
        next(); 
    }
}

module.exports = {
    checkForAuthenticationCookie,
    createTokenForUser,
    validateToken,
}