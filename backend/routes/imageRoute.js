const { getImageAuth, uploadImage } = require('../controllers/imageController');
const express = require('express');

const router = express.Router();


// router.get('/get', getImageAuth);

router.post('/upload', uploadImage);

module.exports = router;