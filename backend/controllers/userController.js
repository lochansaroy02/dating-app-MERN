const User = require('../models/userModel');
const { uploadImage } = require('./imageController');






const createUser = async (req, res) => {
    const { name, email, age, gender, relationship, religion, likedBy, likes, images } = req.body;


    if (req.files && req.files.images) {
        const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        for (let image of files) {
            const result = await cloudinary.uploader.upload(image.tempFilePath);
            imagesArray.push(result); // Store only the URL
        }
    }
    try {
        const user = new User({ name, email, age, gender, relationship, religion, likedBy, likes, images });
        await user.save();
        res.status(201).json({ message: 'User created successfully', data: user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const deleteUser = async (req, res) => {
    const { userId } = req.param;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }

}

const updateLikes = async (req, res) => {
    const loggedInUser = req.user;
    const { userId } = req.body;

}



const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }


}
module.exports = { createUser, getUsers, deleteUser };