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
                message: 'Post not found'
            })
        }


        const user = await User.findOne({username})

        if ( !user ) {
            return res.status(400).json({
                message: "User not found"
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
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteComment = async (req, res) => {
    const {postID} = req.query
    const {username} = req.user

    try { const post = await Post.findById(postID)

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

        await Comment.deleteMany({
            postID: postID,
            user: user._id
        })

        res.status(201).json({
            message: 'Comment deleted successfully'
        })
        
    } 
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getAllCommentsFromPost = async (req, res) => {
    const {postID} = req.query
    
    try {
        const post = Post.findById(postID)

        if ( !post ) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        const comments = post.comments.map(async (comment) => {
            const user = User.findById(comment.user)

            return (
                {
                    username: user.username,
                    profilePic: user.profilePic,
                    text: comment.text,
                    likes: comment.likes
                }
            )
        })

        res.status(200).json([
            comments
        ])
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    addComment,
    deleteComment,
    getAllCommentsFromPost
}