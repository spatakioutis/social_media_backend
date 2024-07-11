const Post = require('../models/Post')
const User = require('../models/User')

const addComment = async (req, res) => {
    const { postID, text } = req.body
    const username = req.user

    try {
        const post = await Post.findById(postID)

        if ( !post ) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        const user = await User.findOne({username})

        if ( !user ) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const newComment = {
            user: user._id,
            text: text
        }

        post.comments.push(newComment)

        await post.save()

        res.status(201).json({
            message: 'Comment added successfully'
        })
        

    catch (error) {
        res.status(400).json([
            message: error.message
        ])
    }
}

const deleteComment = async (req, res) => {
    const { postID } = req.body
    const username = req.user

    try {
        const post = await Post.findById(postID)

        if ( !post ) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        const user = await User.findOne({username})

        if ( !user ) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        post.comments = post.comments.filter(comment => !comment.user.equals(user._id))

        await post.save()

        res.status(201).json({
            message: 'Comment deleted successfully'
        })
        
    catch (error) {
        res.status(400).json([
            message: error.message
        ])
    }
}