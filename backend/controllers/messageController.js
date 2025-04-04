const { getReceiverSocketId, io } = require('../config/socket');
const Auth = require('../models/authModel');
const Message = require('../models/messageModel');


const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getUserForChat = async (req, res) => {
    // here those user will shows which are friends  to the thisUser ( likes and likedBy are matched)
    // fix the code accordingly
    try {

        const loggedInUserID = req.user._id;
        console.log(req.user)
        const filteredUser = await Auth.find({ _id: { $ne: loggedInUserID } }).select("-password");
        res.status(200).json({
            filteredUser
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server error" })
    }

}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user.userId;
        const messages = await Message.find({
            $or: [
                {
                    senderId: myId, receiverId: userToChatId
                }, {
                    senderId: userToChatId, receiverId: myId
                }
            ]
        })



        res.status(200).json({ messages: messages })
    } catch (error) {
        console.error("Error in getting messages", error.message);
        res.status(500).json({ error: "Internal Server Error " })
    }

}

// fix the cloudinery image
const sendMessages = async (req, res) => {

    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.userId;
        // console.log(req.user)
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId, receiverId, text, image: imageUrl
        })

        await newMessage.save();


        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMassage", newMessage)
        }
        res.status(201).json({ newMessage })

    } catch (error) {
        console.log("Error in send messages ", error.message);
        res.status(500).json({
            message: "Internal Server error "
        })
    }
}

module.exports = { getUserForChat, getMessages, sendMessages };