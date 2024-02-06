const mongoose = require('mongoose')
const {Schema} = mongoose
const ObjectId = mongoose.Schema.Types.ObjectId

const clothIdeaSchema = new Schema({
    frontImageUrl: {
        type: String,
        unique: true
    },
    backImageUrl: {
        type: String,
        unique: true
    },
    user: {type: ObjectId, ref: 'User'}
})

const ClothIdeaModel = mongoose.model('ClothIdea', clothIdeaSchema);

module.exports = ClothIdeaModel;