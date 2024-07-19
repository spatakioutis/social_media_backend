const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

const addComment = async (req, res) => {
    const { postID, text } = req.body
    const {username} = req.user

    try {
        const post = await Post.findById(postID)

        if ( !post ) {
            return res.status(404).json({
                error: 'Post not found'
            })
        }


        const user = await User.findOne({username})

        if ( !user ) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        const newComment = new Comment({
            postID: postID,
            user: user._id,
            text: text
        })

        await newComment.save()

        post.comments.push(newComment._id)

        await post.save()

        res.status(201).json({
            message: 'Comment added successfully'
        })
        
    } 
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteComment = async (req, res) => {
    const {commentID} = req.query

    try { 
        const comment = await Comment.findById(commentID)

        if ( !comment ) {
            return res.status(404).json({
                error: 'Comment not found'
            })
        }
        await comment.deleteOne()

        res.status(201).json({
            message: 'Comment deleted successfully'
        })
        
    } 
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getAllCommentsFromPost = async (req, res) => {
    const {postID} = req.query
    
    try {
        let comments = await Comment.find({postID})

        comments = await Promise.all(comments.map(async (comment) => {
            const user = await User.findById(comment.user)

            return (
                {
                    ...comment._doc,
                    username: user.username,
                    profilePic: user.profilePic,
                }
            )
        }))

        res.status(200).json({
            comments
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    addComment,
    deleteComment,
    getAllCommentsFromPost
}