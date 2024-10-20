const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const moodRoutes = require('./routes/moodRoutes');
const authRoutes = require('./routes/authRoutes');  // New auth routes
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); // Enable CORS for all requests



// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api/mood', moodRoutes);
app.use('/api/auth', authRoutes);  // New authentication routes

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the error for debugging
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
  });

app.get('/', (req, res) => {
    res.send('Welcome to the Mood and Mental Health App API');  // or render a view if needed
});