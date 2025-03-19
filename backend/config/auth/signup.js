const Auth = require('../../models/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await Auth.find({ email });
        if (userExists.length > 0) {

            return res.status(400).json({ error: 'User already exists please login' });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new Auth({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ message: 'User created successfully', data: user, token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { signup };