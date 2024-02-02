const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const hashPassword = (password) => {
    return new Promise((resolve, reject) =>{
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    })
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}

const getUserFromToken = async (req, res) => {
    const { token } = req.cookies;
    let user = null;

    if (token) {
        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
            if (user) {
                user = await User.findOne({ email: user.email }).populate('cart_list');
            }
        } catch (err) {
            console.error('Error verifying JWT:', err);
        }
    }

    return user;
}

module.exports = {
    hashPassword,
    comparePassword,
    getUserFromToken,
}