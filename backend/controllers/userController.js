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
    const { userId } = req.params;

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
    try {
        const { userId } = req.params;  // Ensure userId is extracted correctly
        const { likerId } = req.body;

        if (!userId || !likerId) {
            return res.status(400).json({ message: "Missing userId or likerId" });
        }

        // Find the liked user
        const likedUser = await User.findById(userId);
        if (!likedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent duplicate likes
        if (likedUser.likedBy.includes(likerId)) {
            return res.status(400).json({ message: "User already liked" });
        }

        // Add likerId to likes array
        likedUser.likedBy.push(likerId);
        await likedUser.save();

        // Find the liker user
        const likerUser = await User.findById(likerId);
        if (!likerUser) {
            return res.status(404).json({ message: "Liker not found" });
        }

        // Ensure liked user's ID is added to likedBy array
        if (!likerUser.likes.includes(userId)) {
            likerUser.likes.push(userId);
            await likerUser.save();
        }

        res.status(200).json({ message: "User liked successfully", likedUser, likerUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}



const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }


}


module.exports = { createUser, getUsers, deleteUser, updateLikes };