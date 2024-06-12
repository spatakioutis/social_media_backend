const express = require('express')

const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const authentication = require('../middleware/authentication.js')
const userRegistration = require('../controllers/userRegistrationController.js')

const router = express.Router()

router.post('/', upload.single('profilePic'), userRegistration.registerUser)
router.delete('/', authentication.authenticateUserKey, userRegistration.unregisterUser)

module.exports = router