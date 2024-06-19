const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const publicKeyPath = process.env.PUBLIC_KEY_PATH;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;

const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

const authenticateUserKey = (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1] // Bearer <token>
    if (!token) {
        return res.status(401).send('Access denied. No token provided.')
    }

    try {
        const user = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
        req.user = user
        console.log(user)
        next()
    } catch (err) {
        res.status(401).send('Access denied. Invalid token.')
    }
}

const generateUserKey = (username) => {
    return jwt.sign({ username: username }, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
}

module.exports = {
    authenticateUserKey,
    generateUserKey
}
