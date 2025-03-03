const login = require("../auth/login");
const { signup } = require("../auth/signup");


const express = require('express');
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login );

module.exports = router;