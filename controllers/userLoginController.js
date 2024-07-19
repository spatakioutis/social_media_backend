const bcrypt = require('bcryptjs')
const authentication = require('../middleware/authentication')
const User = require('../models/User')

const loginUser = async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                error: 'Username does not exist'
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ 
                error: 'Invalid password'
            })
        }

        const token = authentication.generateUserKey(username)

        res.status(200).json({ 
            message: 'Login succesful',
            token: token,
            user: {
                userID:     user._id,
                username:   user.username,
                firstName:  user.firstName,
                lastName:   user.lastName,
                email:      user.email,
                birthDate:  user.birthDate,
                profilePic: user.profilePic  
            }
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


module.exports = {
    loginUser
}
