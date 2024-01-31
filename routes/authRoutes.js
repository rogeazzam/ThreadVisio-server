const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser1, registerUser2, registerUser3, registerUser4, 
    registerUser5 } = require('../controllers/authController');

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.get('/', test);
router.post('/register1', registerUser1);
router.post('/register2', registerUser2);
router.post('/register3', registerUser3);
router.post('/register4', registerUser4);
router.post('/register5', registerUser5);


module.exports = router;