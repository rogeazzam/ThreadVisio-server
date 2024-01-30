const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test } = require('../controllers/authController');

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', test)

module.exports = router;