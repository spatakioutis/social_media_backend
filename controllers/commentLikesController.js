const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

const addLikeToComment = async (req, res) => {
    const {commentID} = req.body
    const {username} = req.user

    try {
        const comment = await Comment.findById(commentID)

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            })
        }

        const user = await User.findOne({username})

        if ( comment.likes.some(like => like.equals(user._id)) ) {
            return res.status(400).json({
                message: "User has already liked this comment"
            })
        }

        comment.likes.push(user._id)
        
        await comment.save()

        res.status(201).json({
            message: 'Comment like succesful'
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const deleteLikeFromComment = async (req, res) => {
    const {username} = req.user
    const {commentID} = req.query

    try {
        const comment = await Comment.findById(commentID)

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            })
        }

        const user = await User.findOne({username})

        if ( ! comment.likes.some(like => like.equals(user._id)) ) {
            return res.status(400).json({
                message: "User has not liked this comment"
            })
        }

        comment.likes = comment.likes.filter(like => !like.equals(user._id))

        await comment.save()

        res.status(200).json({
            message: 'Comment like removal succesful'
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    addLikeToComment,
    deleteLikeFromComment
}