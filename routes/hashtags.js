const express = require('express')

const authentication = require('../middleware/authentication.js')
const hashtagsController = require('../controllers/hashtagsController.js')

const router = express.Router()

router.get('/', authentication.authenticateUserKey, hashtagsController.getHashtagPosts)
router.get('/search', authentication.authenticateUserKey, hashtagsController.getHashtagsFromSearch)

module.exports = router