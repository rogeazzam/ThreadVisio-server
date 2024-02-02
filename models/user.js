const mongoose = require('mongoose');
const {Schema} = mongoose
const ObjectId = mongoose.Schema.Types.ObjectId

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
    },
    cart_list: {type: ObjectId, ref: 'CartList'}
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;