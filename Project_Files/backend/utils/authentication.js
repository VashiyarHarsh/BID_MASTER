require('dotenv').config();

const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token) {
    try {
        const payload = JWT.verify(token, secret);
        return payload;
    } 
    catch (err) {
        throw new Error('Invalid token');
    }
}

const checkForAuthorizationHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("Unauthorized: Token missing or invalid");
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send("Unauthorized: Token invalid");
    }

    try {
        const userPayload = validateToken(token);

        req.user = userPayload;
        
        res.locals.user = userPayload;

        next();
    } 
    catch (err) {
        return res.status(403).send("Forbidden: Invalid token");
    }
};

const checkAdmin = (req, res, next) => {
    const user = req.user;

    if(user.role !== 'Admin') {
        return res.status(403).send("Access denied: Admins only");
    }

    next();
};

module.exports = {
    checkForAuthorizationHeader,
    createTokenForUser,
    validateToken,
    checkAdmin,
};