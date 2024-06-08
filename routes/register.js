const express = require('express')
const authentication = require('../middleware/authentication')
const userRegistration = require('../controllers/userRegistration')
const router = express.Router()

router.post('/', authentication.checkUsernameExists ,userRegistration.registerUser)
router.delete('/', userRegistration.unregisterUser)

module.exports = router