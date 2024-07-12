const mongoose = require('mongoose')
const Post = require('./Post')

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

const Comment = mongoose.model('Comment', commentSchema, 'comments')

commentSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const commentID = this._id

    try {
        await Post.updateOne(
            { comments: commentID },
            { $pull: { comments: commentID } }
        )
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = Comment