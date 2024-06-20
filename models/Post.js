const mongoose = require('mongoose')
const User = require('./User')

const postSchema = new mongoose.Schema({
    user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        },
    image: { 
            type: String, 
            required: true 
        },
    likes: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }],
    comments: [{
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        text: { 
            type: String, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post

