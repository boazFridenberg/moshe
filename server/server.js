require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lomdaSolder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/users', async (req, res) => {
    try {
        const { name, idNumber } = req.body;

        if (!name || !idNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newUser = new User({
            name,
            idNumber
        });

        await newUser.save();
        res.status(201).json({ message: 'User data saved successfully', user: newUser });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            res.status(200).json({
                message: 'Login successful',
                token: 'admin-authenticated' // Simple token for demo purposes
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get All Users (Admin Only)
app.get('/api/admin/users', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader !== 'Bearer admin-authenticated') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const users = await User.find().sort({ timestamp: -1 });
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
