const express = require('express')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const authentication = require('../middleware/authentication.js')
const profilePicController = require('../controllers/profilePicController.js')

const router = express.Router()

router.post('/', authentication.authenticateUserKey , upload.single('profilePic'), profilePicController.addProfilePic)
router.put('/', authentication.authenticateUserKey , upload.single('profilePic'), profilePicController.addProfilePic )
router.delete('/', authentication.authenticateUserKey,  profilePicController.deleteProfilePic)
router.get('/', authentication.authenticateUserKey,  profilePicController.sendProfilePic)

module.exports = router