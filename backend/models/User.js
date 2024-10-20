// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    voiceInput: {
        type: String, // You might want to change this to a Buffer if you plan to store audio data
        required: false, // This can be optional if you don't always have voice input
       
    },
    textInput: {
        type: String, // For storing any text input
        required: false, // This can also be optional
    
},
createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
},
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;  