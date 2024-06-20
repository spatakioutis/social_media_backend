const User = require('../models/User') 
const bcrypt = require('bcryptjs')

const updateUserInfo = async (req, res) => {
    const { username } = req.user
    const { updates } = req.body

    //this controller is not allowed to alter the user password 
    if (updates.password) {
        delete updates.password
    }

    try {
        if (updates.username !== username) {
            const existingUser = await User.findOne({ username: updates.username })
            if (existingUser) {
                return res.status(400).json({ 
                    message: 'Username is already taken' 
                })
            }
        }

        const updatedUser = await User.findOneAndUpdate(
            {username},
            { $set: updates },
            { new: true, runValidators: true }
        )
        
        res.status(200).json({
            user: {
                username:   updatedUser.username,
                firstName:  updatedUser.firstName,
                lastName:   updatedUser.lastName,
                email:      updatedUser.email,
                birthDate:  updatedUser.birthDate,
                profilePic: updatedUser.profilePic  
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            message: 'Error updating user information',
            error 
        })
    }
}

const updatePassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    const {username} = req.user

    try {
        const user = await User.findOne({ username })

        const passwordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ 
                message: 'Invalid password'
            })
        }

        user.password = newPassword

        await user.save()

        res.status(200).json({
            message: 'Password changed successfully'
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    updateUserInfo,
    updatePassword
}
