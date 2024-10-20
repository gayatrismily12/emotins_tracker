// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Middleware to authenticate using JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Authorization' header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Save user info to request for use in other routes
        next();
    });
};

module.exports = authenticateJWT;
