const express = require('express')

const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const userRegistration = require('../controllers/userRegistration')
const router = express.Router()

router.post('/', upload.single('profilePic'), userRegistration.registerUser)
router.delete('/', userRegistration.unregisterUser)

module.exports = router