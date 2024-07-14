const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

commentSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const commentID = this._id

    try {
        const Post = require('./Post')
        await Post.updateMany(
            { comments: commentID },
            { $pull: { comments: commentID } }
        )
        next()
    } catch (error) {
        next(error)
    }
})

const Comment = mongoose.model('Comment', commentSchema, 'comments')

module.exports = Comment