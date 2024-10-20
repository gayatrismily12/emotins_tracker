const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Assuming protect middleware for JWT authentication
const router = express.Router();

// Example route for processing user actions after login (without storing mood, voice, or text)
router.post('/submit', async (req, res) => {
    try {
        const user = req.user; // The authenticated user from the protect middleware

        // Log user activity (without storing unnecessary data)
        console.log(`User ${user.username} accessed the submit route.`);

        res.status(200).json({ message: 'Processed successfully', user: { username: user.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
