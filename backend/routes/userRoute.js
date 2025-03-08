const { createUser, getUsers, deleteUser, updateLikes } = require('../controllers/userController');
const express = require('express');


const router = express.Router();

router.post('/create', createUser);
router.get('/get', getUsers);
router.delete('/delete/:id', deleteUser);
router.put('/likes/:userId', updateLikes);



module.exports = router;
