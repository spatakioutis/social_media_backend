const { uploadProfilePic } = require('../utils/imageHandle')
const User = require('../models/User')

const addProfilePic = async (req, res) => {

    const username = req.user.username

    try {
        const image_url = await uploadProfilePic(username, req.file)
        
        const user = await User.findOne({ username })
        user.profilePic = image_url
        await user.save()

        res.status(200).json({message: 'Profile icture upload successful'})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

module.exports = {
    addProfilePic
}