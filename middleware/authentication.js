const db = require('../database')

const checkUsernameExists = (req, res, next) => {

    const {username} = req.body

    //check if username exists
    const checkUsernameQuery = 'SELECT * FROM user_info WHERE username=?'
    db.query(checkUsernameQuery, [username], (error, results, fields) => {
        if (error) {
            console.error('Error checking username: ' + error.message)
            res.status(500).json({
                message: 'Server error'
            })
            return
        }
        
        //Check if username already exists
        if (results.length > 0) {
            res.status(400).json({
                message: 'Username already exists'
            })
            return
        }
        else 
            next()
    })
}

module.exports = {
    checkUsernameExists
}
