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
    const payload = JWT.verify(token, secret);
    return payload;
}

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
      const tokenCookieValue = req.cookies[cookieName];
      if (!tokenCookieValue) {
        return res.status(401).json({ error: "Authentication required" });
      }
  
      try {
        const userPayload = validateToken(tokenCookieValue); // Token validation logic
        req.user = userPayload;
        res.locals.user = userPayload;
        next();
      } catch (error) {
        console.error("Invalid token:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    };
  }

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

function setCookie(res, name, value, options = {}) {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", // Required for cross-origin cookies
        domain: process.env.COOKIE_DOMAIN || undefined, // Set the domain if needed
        ...options,
    };
    res.cookie(name, value, cookieOptions);
}

function clearCookie(res, name) {
    res.clearCookie(name, { httpOnly: true });
}

module.exports = {
    checkForAuthenticationCookie,
    createTokenForUser,
    validateToken,
    restrictTo,
    setCookie,
    clearCookie,
};