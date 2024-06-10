const bcrypt = require('bcryptjs')
const authentication = require('../middleware/authentication')
const User = require('../models/User')

const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: 'Username does not exist' })
        }
 
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = authentication.generateUserKey(username)

        res.status(200).json({ 
            message: 'Login succesful',
            token: token 
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}


module.exports = {
    loginUser
}
