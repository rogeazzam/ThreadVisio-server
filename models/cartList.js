const mongoose = require('mongoose')
const {Schema} = mongoose
const ObjectId = mongoose.Schema.Types.ObjectId

const cartListSchema = new Schema({
    title: {type: String, default: "Main"},
    cloths: [{type: ObjectId, ref: 'Cloth'}]
})

const cartListModel = mongoose.model('CartList', cartListSchema);

module.exports = cartListModel;