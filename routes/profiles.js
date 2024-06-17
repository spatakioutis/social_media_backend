const express = require('express')

// const multer = require('multer')
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

const authentication = require('../middleware/authentication.js')
const profilesController = require('../controllers/profilesController.js')

const router = express.Router()

router.get('/', authentication.authenticateUserKey, profilesController.getUserProfile)

module.exports = router