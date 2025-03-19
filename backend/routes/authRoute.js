const login = require("../config/auth/login");
const { signup } = require("../config/auth/signup");


const express = require('express');
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);

module.exports = router;