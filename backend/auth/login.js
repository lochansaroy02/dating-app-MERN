const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Auth = require('../models/authModel');
require('dotenv').config();

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email ' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return token and user info (excluding password)
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = login;