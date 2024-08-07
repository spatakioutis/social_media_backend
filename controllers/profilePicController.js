const {uploadFileToGoogleCS, deleteFileFromGoogleCS } = require('../utils/imageHandle')
const User = require('../models/User')

const addProfilePic = async (req, res) => {

    const {username} = req.user

    try {

        const user = await User.findOne({ username })

        if ( user.profilePic !== 'https://storage.googleapis.com/spatakioutis_app_img/profilePics/default_pic.png') {
            const filepath = user.profilePic.split('/')
            await deleteFileFromGoogleCS(filepath[filepath.length - 1], 'profPics')
        }
        
        const image_url = await uploadFileToGoogleCS(username, req.file, 'profPics')

        user.profilePic = image_url
        await user.save()

        res.status(200).json({
            message: 'Profile picture upload successful'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    } 
}

const deleteProfilePic = async (req, res) => {

    const {username} = req.user

    try {
        const user = await User.findOne({ username })

        if ( user.profilePic !== 'https://storage.googleapis.com/spatakioutis_app_img/profilePics/default_pic.png') {
            const filepath = user.profilePic.split('/')
            await deleteFileFromGoogleCS(filepath[filepath.length - 1], 'profPics')
            user.profilePic = 'https://storage.googleapis.com/spatakioutis_app_img/profilePics/default_pic.png'
        }
    
        await user.save()

        res.status(200).json({
            message: 'Profile picture deleted successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message}
        )
    } 
}

const sendProfilePic = async (req, res) => {
    const {username} = req.query

    try {
        const user = await User.findOne({ username })

        res.status(200).json({
            image: user.profilePic
        })

    }
    catch (error) {
        res.status(500).json({
            error: error.message}
        )
    }
}

module.exports = {
    addProfilePic,
    deleteProfilePic,
    sendProfilePic
}