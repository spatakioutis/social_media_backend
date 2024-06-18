const Post = require('../models/Post')

const addLikeToPost = async (req, res) => {
    const {username, postID} = req.body

    console.log(postID)
    console.log(username)

    try {
        const post = await Post.findById(postID)

        if (!post) {
            res.status(404).json({
                message: "Post not found"
            })
            return
        }

        if ( post.likes.some(like => like === username) ) {
            return res.status(400).json({
                message: "User has already liked this post"
            })
        }

        post.likes.push(username)

        console.log(post.likes)
        
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
    const {username} = req.params
    const {postID} = req.query
    
    console.log(postID)
    console.log(username)

    try {
        const post = await Post.findById(postID)

        if (!post) {
            res.status(404).json({
                message: "Post not found"
            })
            return
        }

        if ( ! post.likes.some(like => like === username) ) {
            return res.status(400).json({
                message: "User has not liked this post"
            })
        }

        post.likes = post.likes.filter(like => like !== username)

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