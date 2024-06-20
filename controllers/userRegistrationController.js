const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcryptjs');
const { deleteFileFromGoogleCS } = require('../utils/imageHandle');

const registerUser = async (req, res) => {
    const {firstName, lastName, username, email, password} = req.body
    
    const profilePic = 'https://storage.googleapis.com/spatakioutis_app_img/profilePics/default_pic.png'

    const birthDate = new Date(req.body.birthDate).toISOString().split('T')[0]
    
    try {
        const newUser = new User({username, password, firstName, lastName, email, birthDate, profilePic})

        await newUser.save()

        res.status(201).json({
            message: 'Registration successful' 
        })

    } catch (error) {
        if (error.code == 11000) {
            res.status(400).json({
                error: 'Username already exists'
            })
        }
        else {
            res.status(400).json({
                error: error.message
            })
        }
    }
}

const unregisterUser = async (req, res) => {
    const {password} = req.query
    const {username} = req.user

    try {
        const user = await User.findOne({ username })
        
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({
                message: 'Invalid password'
            })
        }

        await user.deleteOne()

        res.status(200).json({
            message: 'User deleted succesfully'
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    registerUser,
    unregisterUser
}