const {uploadFileToGoogleCS, deleteFileFromGoogleCS } = require('../utils/imageHandle')
const User = require('../models/User')
const Post = require('../models/Post')

const addUserPost = async (req, res) => {
    // const {comments} = req.body
    const username = req.user.username
    
    try {
        const newPost = new Post({user: username, image: ''})

        const image_url = await uploadFileToGoogleCS(newPost._id, req.file, 'postPics')
        
        newPost.image = image_url

        await newPost.save()

        res.status(201).json({message: 'Post upload successful'})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteUserPost = async (req, res) => {
    const {postID} = req.body

    try {
        const post = await Post.findById(postID)

        const imagePath = post.image.split('/')

        await deleteFileFromGoogleCS(imagePath[imagePath.length - 1], 'postPics')

        post.deleteOne()

        res.status(200).json({message: 'Post deletion successful'})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    addUserPost,
    deleteUserPost
}