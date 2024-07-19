const Post = require('../models/Post')
const User = require('../models/User')
const Hashtag = require('./Hashtag')

const getHashtagPosts = async (req, res) => {
    const {tag} = req.query

    try {
        const hashtag = await Hashtag.findOne(tag)
        
        if ( !hashtag ) {
            return res.status(404).json({
                error: 'Hashtag does not exist'
            })
        }

        let posts = await Promise.all( hashtag.posts.map(async (postID) => {
            try {
                const post = await Post.findById(postID)
                const user = await User.findById(post.user)

                return {
                    ...post.toObject(),
                    userInfo: {
                        username: user.username,
                        profilePic: user.profilePic
                    }
                }
            } 
            catch (error) {
                throw new Error(`Error fetching post or user: ${error.message}`)
            }
        }))
    
        posts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        
        res.status(200).json({
            posts
        })

    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    } 
}

module.exports = {
    getHashtagPosts
}