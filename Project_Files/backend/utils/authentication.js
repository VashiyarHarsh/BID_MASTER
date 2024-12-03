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
    } catch (err) {
        console.error('Token verification failed:', err);  // Log the error
        throw new Error('Invalid token');
    }
}

const checkForAuthorizationHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send("Unauthorized: Token missing or invalid");
    }
    const token = authHeader.split(' ')[1]; // Extract the token
    if (!token) {
        return res.status(401).send("Unauthorized: Token invalid");
    }
    try {
        console.log('try')
        const userPayload = validateToken(token); // Token validation logic
        req.user = userPayload;
        console.log(userPayload);
        res.locals.user = userPayload;
        next();
        console.log('after next')
    } catch (err) {
        console.log('catch')
        return res.status(403).send("Forbidden: Invalid token");
    }
};
// function checkForAuthenticationCookie(cookieName) {
//     return (req, res, next) => {
//         const tokenCookieValue = req.cookies[cookieName];
//         if (!tokenCookieValue) {
//             return next();
//         }
//         try {
//             // Validate and decode the token
//             const userPayload = validateToken(tokenCookieValue);
//             if (userPayload) {
//                 req.userId = userPayload.id; // Store the user ID in req.userId
//                 res.locals.user = userPayload; // Optional: Store user data in res.locals for later use
//             }
//         } catch (error) {
//             console.error('Invalid token:', error);
//         }
//         next();
//     }
// }

const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("You do not have permission to access this resource!");
        }
        next();
    };
}

const checkAdmin = (req, res, next) => {
    const user = req.user;
    console.log(user);
    if(user.role !== 'Admin') {
        return res.status(403).send("Access denied: Admins only");
    }
    // if (!user || !user.role || !Array.isArray(user.role) || !user.role.includes('Admin')) {
    //   return res.status(403).send("Access denied: Admins only");
    // }
    next();
  };

function setCookie(res, name, value, options = {}) {
    const cookieOptions = {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true, // Required for HTTPS
        sameSite: "none", // Required for cross-origin cookies
        //domain: process.env.COOKIE_DOMAIN || undefined, // Set the domain if needed
        ...options,
    };
    res.cookie(name, value, cookieOptions);
}

function clearCookie(res, name) {
    res.clearCookie(name, { httpOnly: true });
}

module.exports = {
    checkForAuthorizationHeader,
    createTokenForUser,
    validateToken,
    restrictTo,
    checkAdmin,
    setCookie,
    clearCookie,
};