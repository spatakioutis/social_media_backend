const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

const User = mongoose.model('User', userSchema, 'users')

module.exports = User