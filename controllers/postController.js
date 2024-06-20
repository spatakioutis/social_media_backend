const {uploadFileToGoogleCS, deleteFileFromGoogleCS } = require('../utils/imageHandle')
const Post = require('../models/Post')
const User = require('../models/User')

const addUserPost = async (req, res) => {
    const {text} = req.body
    const {username} = req.user

    try {
        const user = await User.findOne({username})

        const comments = []
        if (text) {
            comments.push({
                user: user._id,
                text: text
            })
        }

        const newPost = new Post({user: user._id, image: '', comments})

        const image_url = await uploadFileToGoogleCS(newPost._id, req.file, 'postPics')
        
        newPost.image = image_url

        await newPost.save()

        res.status(201).json({
            message: 'Post upload successful'
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const deleteUserPost = async (req, res) => {
    const {postID} = req.query

    try {
        const post = await Post.findById(postID)

        const imagePath = post.image.split('/')

        await deleteFileFromGoogleCS(imagePath[imagePath.length - 1], 'postPics')

        await post.deleteOne()

        res.status(200).json({
            message: 'Post deletion successful'
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query

    try {
        const posts = await Post.find()
            .sort({createdAt: -1})
            .skip((page-1) * limit)
            .limit(parseInt(limit))
        
        const postsWithUserInfo = await Promise.all(posts.map(async post => {
            const user = await User.findById(post.user)
            return {
                ...post.toObject(),
                userInfo: {
                    username: user.username,
                    profilePic: user.profilePic
                }
            }
        }))

        res.status(200).json({
            message: 'Post fetching successful',
            posts: postsWithUserInfo
        })
    }
    catch (error) {
        res.status(400).json({
            who: 'i failed',
            error: error.message
        })
    }
}

module.exports = {
    addUserPost,
    deleteUserPost,
    getPosts
}