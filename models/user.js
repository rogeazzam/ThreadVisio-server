const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    user_name: String,
    password: String,
    date_of_birth: Date,
    verification_code: String,
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['customer', 'employee', 'manager'],
        default: 'customer'
    },
    logged_in: {
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;