const Post = require('../models/Post')
const User = require('../models/User')

const addLikeToPost = async (req, res) => {
    const {postID} = req.body
    const {username} = req.user

    try {
        const post = await Post.findById(postID)

        if (!post) {
            res.status(404).json({
                message: "Post not found"
            })
            return
        }

        const user = await User.findOne({username})

        if ( post.likes.some(like => like.equals(user._id)) ) {
            return res.status(400).json({
                message: "User has already liked this post"
            })
        }

        post.likes.push(user._id)
        
        await post.save()

        res.status(201).json({
            message: 'Post like succesful'
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const deleteLikeFromPost = async (req, res) => {
    const {username} = req.user
    const {postID} = req.query

    try {
        const post = await Post.findById(postID)

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        const user = await User.findOne({username})

        if ( ! post.likes.some(like => like.equals(user._id)) ) {
            return res.status(400).json({
                message: "User has not liked this post"
            })
        }

        post.likes = post.likes.filter(like => !like.equals(user._id))

        await post.save()

        res.status(200).json({
            message: 'Post like removal succesful'
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    addLikeToPost,
    deleteLikeFromPost
}