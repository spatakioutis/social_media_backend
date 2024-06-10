const express = require('express')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const authentication = require('../middleware/authentication.js')

const profilePic = require('../controllers/profilePic')
const router = express.Router()

router.post('/profilePic', authentication.authenticateUserKey , upload.single('profilePic'), profilePic.addProfilePic)
router.put('/profilePic', authentication.authenticateUserKey , upload.single('profilePic'),profilePic.addProfilePic )
router.delete('/profilePic', authentication.authenticateUserKey,  profilePic.deleteProfilePic)

router.post('/post', upload.single('image') )
router.delete('/post', upload.single('image'))

module.exports = router