const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Post = require('./Post')
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
    const userId = this._id

    try {
        await Post.updateMany(
            { likes: userId },
            { $pull: { likes: userId } }
        )

        await Post.updateMany(
            { 'comments.user': userId },
            { $pull: { comments: { user: userId } } }
        )

        const posts = await Post.find({ user: userId })

        const deleteImagePromises = posts.map(async (post) => {
            if (post.image) {
                const imagePath = post.image.split('/')
                const filename = imagePath[imagePath.length - 1]
                await deleteFileFromGoogleCS(filename, 'postPics')
            }
        })

        await Promise.all(deleteImagePromises)

        await Post.deleteMany({ user: userId })

        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User