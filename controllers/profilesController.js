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

        const reqUserPosts = await Post.find({user: username})
        
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
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    getUserProfile
}