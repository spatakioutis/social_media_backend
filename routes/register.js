const express = require('express')

const userRegistration = require('../controllers/userRegistration')
const router = express.Router()

router.post('/', userRegistration.registerUser)
router.delete('/', userRegistration.unregisterUser)

module.exports = router