const bcrypt = require('bcryptjs')

const registerUser = async (req, res, next) => {
    const {firstName, lastName, username, email, birthDate, password} = req.body

    const birthdate = new Date(birthDate).toISOString().split('T')[0]

    const hashedPassword = await bcrypt.hash(password, 10);

    //make registration query

    // const registerQuery = 'INSERT INTO user_info(first_name, last_name, username, email, birthdate, password) VALUES (?,?,?,?,?,?)'
    // db.query(registerQuery, [firstName, lastName, username, email, birthdate, password], (error, results, fields) => {
    //     if (error) {
    //         console.error('Error wwhile registering: ' + error.message)
    //         res.status(500).json({
    //             message: 'Server error'
    //         })
    //         return
    //     }
    //     console.log(results)

    //     res.status(200).json({
    //         message: 'Registration successful'
    //     })
    // })

}

const unregisterUser = (req, res, next) => {
    const {username} = req.body

    const unregisterQuery = 'DELETE FROM user_info WHERE username=?'
    db.query(unregisterQuery, [username], (error, results, fields) => {
        if (error) {
            console.error('Error wwhile unregistering: ' + error.message)
            res.status(500).json({
                message: 'Server error'
            })
            return
        }
        console.log(results)

        res.status(200).json({
            message: 'Unregistration successful'
        })
    })

}

module.exports = {
    registerUser,
    unregisterUser
}