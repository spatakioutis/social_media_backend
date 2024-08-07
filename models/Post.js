const mongoose = require('mongoose')
const Comment = require('./Comment')
const Hashtag = require('./Hashtag')

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
    caption: {
        type: String
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    hashtags: [{
        type: String
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

postSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const postID = this._id

    try {
        await Comment.deleteMany({ postID: postID })

        await Hashtag.updateMany(
            { posts: postID },
            { $pull: { posts:postID } }
        )
        next()
    } catch (error) {
        next(error)
    }
})

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post

