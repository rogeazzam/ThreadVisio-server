const express = require('express');
const { generateImage, submitImage } = require('../controllers/openaiController')
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/submitimage', submitImage);

module.exports = router;