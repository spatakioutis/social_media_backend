const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Post = require('./Post')
const Comment = require('./Comment')
const { deleteFileFromGoogleCS } = require('../utils/imageHandle')

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    birthDate: {
        type: Date  ,
        required: true 
    },
    profilePic: {
        type: String,
        required: false
    }  
})

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password') || this.isNew) {
            this.password = await bcrypt.hash(this.password, 10)
        }
        next()
    } catch (err) {
        next(err)
    }
})

userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const userID = this._id

    try {
        // Remove user from likes in posts
        await Post.updateMany(
            { likes: userID },
            { $pull: { likes: userID } }
        )

        // Remove user likes from comments
        await Comment.updateMany(
            { likes: userID },
            { $pull: { likes: userID } }
        )

        // Delete comments by the user
        const userComments = await Comment.find({ user: userID })
        const userCommentIds = userComments.map(comment => comment._id)

        await Comment.deleteMany({ user: userID })

        // Remove user's comments from posts
        await Post.updateMany(
            { comments: { $in: userCommentIds } },
            { $pull: { comments: { $in: userCommentIds } } }
        )

        // Delete post images
        const posts = await Post.find({ user: userID })

        const deleteImagePromises = posts.map(async (post) => {
            if (post.image) {
                const imagePath = post.image.split('/')
                const filename = imagePath[imagePath.length - 1]
                await deleteFileFromGoogleCS(filename, 'postPics')
            }
        })

        await Promise.all(deleteImagePromises)

        await Post.deleteMany({ user: userID })

        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User