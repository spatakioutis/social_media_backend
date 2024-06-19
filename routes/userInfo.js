const express = require('express')


const authentication = require('../middleware/authentication.js')
const userInfoController = require('../controllers/userInfoController.js')

const router = express.Router()

router.put('/', authentication.authenticateUserKey, userInfoController.updateUserInfo)
router.put('/password', authentication.authenticateUserKey, userInfoController.updatePassword)


module.exports = router