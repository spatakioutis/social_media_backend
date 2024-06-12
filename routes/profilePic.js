const express = require('express')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const authentication = require('../middleware/authentication.js')
const profilePic = require('../controllers/profilePic.js')

const router = express.Router()

router.post('/', authentication.authenticateUserKey , upload.single('profilePic'), profilePic.addProfilePic)
router.put('/', authentication.authenticateUserKey , upload.single('profilePic'), profilePic.addProfilePic )
router.delete('/', authentication.authenticateUserKey,  profilePic.deleteProfilePic)

module.exports = router