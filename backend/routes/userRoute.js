const { createUser, getUsers, deleteUser, updateLikes, updateUser } = require('../controllers/userController');
const express = require('express');
const { protectRoute } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/create', createUser);
router.get('/get', getUsers);
router.put('/likes/:userId', updateLikes);
router.patch('/update/:id', updateUser)




module.exports = router;
