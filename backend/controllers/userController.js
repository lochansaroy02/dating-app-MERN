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
        console.log(imagesArray);
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
        const { userId } = req.params; // The user who is being liked
        const { likerId } = req.body; // The user who likes

        if (!userId || !likerId) {
            return res.status(400).json({ message: "Missing userId or likerId" });
        }

        // Find users
        const userData = await User.findById(userId);
        const likerData = await User.findById(likerId);

        if (!userData || !likerData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if liker has already liked the user
        if (userData.likedBy.includes(likerId)) {
            return res.status(400).json({ message: "User already liked" });
        }
        if (likerData.likes.includes(userId)) {
            return res.status(400).json({ message: "User already in likes" });
        }

        // Update likedBy array in the user who got liked
        await User.findByIdAndUpdate(userId, { $push: { likedBy: likerId } });

        // Update likes array in the liker
        await User.findByIdAndUpdate(likerId, { $push: { likes: userId } });

        res.status(200).json({ message: "User liked successfully", data: likerData });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }


}


module.exports = { createUser, getUsers, deleteUser, updateLikes };