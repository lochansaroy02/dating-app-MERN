const User = require('../models/userModel');
const { uploadImage } = require('./imageController');





const createUser = async (req, res) => {
    try {
        const { name, email, age, gender, relationship, religion, likedBy, likes, images } = req.body;
        const imageArr = images[0].split(",");

        // if (!Array.isArray(images)) {
        //     images = [images]; // Convert single string to array
        // }

        // Create new user with uploaded images
        const user = new User({
            name,
            email,
            age,
            gender,
            relationship,
            religion,
            likedBy,
            likes,
            images
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", data: user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const userID = req.params.id; // Fix: Extract ID correctly
        const updatedData = req.body;

        // Update user data
        const updatedUser = await User.findByIdAndUpdate(userID, updatedData, {
            new: true, // Return updated user document
            runValidators: true, // Validate fields
        });

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


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


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({
            message: "User deleted successfully"
        })


    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = { createUser, getUsers, updateUser, updateLikes, deleteUser };