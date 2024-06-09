const bcrypt = require('bcryptjs')
const db = require('../database')
const authentication = require('../middleware/authentication')

const loginUser = (req, res) => {
    const {username, password} = req.body

    // check username exists 
    console.log(username, password)
    // check password 

    // generate connection JWT
    const token = authentication.generateUserKey(username)
    
    res.status(200).json({
        token: token
    })
}


module.exports = {
    loginUser
}
