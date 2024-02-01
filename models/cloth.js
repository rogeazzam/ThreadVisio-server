const mongoose = require('mongoose')
const {Schema} = mongoose

const clothSchema = new Schema({
    name: String,
    price: Number,
    color: String,
    material: String,
    size: String,
    description: String,
    quantity: Number,
    imageUrl: {
        type: String,
        unique: true
    },
    otherImagesUrl: [String]
})

const ClothModel = mongoose.model('Cloth', clothSchema);

module.exports = ClothModel;