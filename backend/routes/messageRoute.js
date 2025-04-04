const express = require('express');
const { protectRoute } = require('../middleware/authMiddleware');
const { getUserForChat, getMessages, sendMessages } = require('../controllers/messageController');
const { updateUser } = require('../controllers/userController');

const router = express.Router();

router.get("/users", protectRoute, getUserForChat);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessages)


module.exports = router;