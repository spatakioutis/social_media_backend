const express = require('express')

const userLogin = require('../controllers/userLogin')
const router = express.Router()

router.get('/', userLogin.loginUser)

module.exports = router