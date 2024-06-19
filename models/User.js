const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Post = require('./Post')

const userSchema = new mongoose.Schema({
    username:   { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    firstName:  { type: String, required: true },
    lastName:   { type: String, required: true },
    email:      { type: String, required: true },
    birthDate:  { type: Date  , required: true },
    profilePic: { type: String, required: false}  
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

userSchema.pre('findOneAndUpdate', async function (next) {
    this.oldDoc = await this.model.findOne(this.getFilter()).lean()
    next()
})

userSchema.post('findOneAndUpdate', async function(doc) {
    const oldUsername = this.oldDoc.username
    const newUsername = this.getUpdate().$set.username

    if (newUsername && newUsername !== oldUsername) {
        await Post.updateMany(
            { user: oldUsername },
            { $set: { user: newUsername } }
        )
    }
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User