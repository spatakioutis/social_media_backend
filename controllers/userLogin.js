const bcrypt = require('bcryptjs')
const authentication = require('../middleware/authentication')

const loginUser = (req, res) => {
    const {username, password} = req.body

    // check username exists 
    // const user = await db.getUserByUsername(username);
    // if (!user) {
    //     return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // // check password 
    // const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) {
    //         return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // generate connection JWT
    const token = authentication.generateUserKey(username)
    
    res.status(200).json({
        token: token
    })
}


module.exports = {
    loginUser
}
