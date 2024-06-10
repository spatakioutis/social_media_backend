const express = require('express')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const authentication = require('../middleware/authentication.js')

const profilePic = require('../controllers/profilePic.js')
const router = express.Router()

router.post('/profilePic', authentication.authenticateUserKey , upload.single('profilePic'), profilePic.addProfilePic)
router.put('/profilePic', authentication.authenticateUserKey , upload.single('profilePic'), profilePic.addProfilePic )
router.delete('/profilePic', authentication.authenticateUserKey,  profilePic.deleteProfilePic)

// router.post('/post', authentication.authenticateUserKey, upload.single('image') )
// router.delete('/post', authentication.authenticateUserKey, upload.single('image'))

// router.post('/comment', authentication.authenticateUserKey )
// router.delete('/comment', authentication.authenticateUserKey)

module.exports = router