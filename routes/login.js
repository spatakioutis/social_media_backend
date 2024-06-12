const express = require('express')

const userLogin = require('../controllers/userLoginController')

const router = express.Router()

router.post('/', userLogin.loginUser)

module.exports = router