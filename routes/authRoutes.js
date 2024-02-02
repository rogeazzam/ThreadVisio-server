const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser1, registerUser2, registerUser3, registerUser4,
    registerUser5, signinUser, getProfile, addUser } = require('../controllers/authController');
const { getClothes, addCloth, getWishlist, addToWishlist,
    removeFromWishlist } = require('../controllers/clothController');

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
router.post('/signin', signinUser);
router.get('/profile', getProfile);
router.post('/adduser', addUser);
router.get('/clothes', getClothes);
router.post('/addcloth', addCloth);
router.get('/wishlist', getWishlist);
router.post('/addtowishlist', addToWishlist);
router.post('/removefromwishlist', removeFromWishlist);


module.exports = router;