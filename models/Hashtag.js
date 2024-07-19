const mongoose = require('mongoose')

const hashtagSchema = new mongoose.Schema({
    tag: { 
        type: String, 
        required: true,
        unique: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Hashtag = mongoose.model('Hashtag', hashtagSchema, 'hashtags')

module.exports = Hashtag