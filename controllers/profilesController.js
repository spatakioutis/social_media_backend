const User = require('../models/User')
const Post = require('../models/Post')

const getUserProfile = async (req, res) => {
    const {username} = req.query

    try {
        const reqUser = await User.findOne({username})

        if (!reqUser) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        const reqUserPosts = await Post.find({user: reqUser._id})
        
        const profile = {
            userInfo: {
                username:   reqUser.username,
                firstName:  reqUser.firstName,
                lastName:   reqUser.lastName,
                email:      reqUser.email,
                birthDate:  reqUser.birthDate,
                profilePic: reqUser.profilePic  
            },
            posts: reqUserPosts
        }

        res.status(200).json({
            profile,
            message: 'Profile fetching successful'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getUsersFromSearch = async (req, res) => {
    const {searchQuery} = req.query

    try {
        const results = await User.find({ 
            username: { $regex: searchQuery, $options: 'i' } 
        })

        const users = results.map(user => {
            return {
                username: user.username,
                profilePic: user.profilePic,
                userID: user._id
            }
        })

        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({ 
            error: error.message
        })
    } 
}

module.exports = {
    getUserProfile,
    getUsersFromSearch
}