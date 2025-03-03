const { createUser, getUsers, deleteUser } = require('../controllers/userController');
const express = require('express');


const router = express.Router();

router.post('/create', createUser);
router.get('/get', getUsers);
router.get('/delete', deleteUser);


module.exports = router;
