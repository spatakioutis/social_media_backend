const User = require('../models/User')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res, next) => {
    const {firstName, lastName, username, email, password} = req.body
    // const birthdate = new Date(birthDate).toISOString().split('T')[0]

    try {
        const newUser = new User( {username, password, firstName, lastName, email} )

        await newUser.save()

        res.status(200).json({ message: 'Registration successful' })

    } catch (error) {
        if (error.code == 11000) {
            res.status(400).json({ error: 'Username already exists' })
        }
        else {
            res.status(400).json({ error: error.message })
        }
        
    }

}

const unregisterUser = async (req, res, next) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({ username })

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        await user.deleteOne()

        res.status(200).json({ message: 'User deleted succesfully' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    registerUser,
    unregisterUser
}