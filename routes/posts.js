const express = require('express')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const authentication = require('../middleware/authentication.js')
const postController = require('../controllers/postController.js')

const router = express.Router()

router.post('/', authentication.authenticateUserKey, upload.single('image'), postController.addUserPost )
router.delete('/', authentication.authenticateUserKey, postController.deleteUserPost)
router.get('/', authentication.authenticateUserKey, postController.getPosts)

module.exports = router