const {uploadFileToGoogleCS, deleteFileFromGoogleCS } = require('../utils/imageHandle')
const User = require('../models/User')

const addProfilePic = async (req, res) => {

    const username = req.user.username

    try {
        const image_url = await uploadFileToGoogleCS(username, req.file, 'profPics')
        
        const user = await User.findOne({ username })
        user.profilePic = image_url
        await user.save()

        res.status(200).json({message: 'Profile icture upload successful'})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    } 
}

const deleteProfilePic = async (req, res) => {

    const username = req.user.username

    try {
        const user = await User.findOne({ username })

        const filepath = user.profilePic.split('/')

        await deleteFileFromGoogleCS(filepath[filepath.length - 1], 'profPics')
        
        user.profilePic = ''
        await user.save()

        res.status(200).json({message: 'Profile picture deleted successfully'})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    } 
}

module.exports = {
    addProfilePic,
    deleteProfilePic
}