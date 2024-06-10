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
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User