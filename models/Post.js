const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user:      { type: String, required: true },
    image:     { type: String, required: true },
    likes:     [{
        user: { type: String, required: true},
        default: []
    }],
    comments: [{
        user: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        default: []
    }],
    createdAt: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post
