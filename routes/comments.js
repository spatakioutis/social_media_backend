const express = require('express')

const authentication = require('../middleware/authentication.js')
const postCommentsController = require('../controllers/postCommentsController.js')
// const postLikesController = require('../controllers/postLikesController.js')

const router = express.Router()

router.post('/', authentication.authenticateUserKey, postCommentsController.addComment )
router.delete('/', authentication.authenticateUserKey, postCommentsController.deleteComment)
router.get('/', authentication.authenticateUserKey, postCommentsController.getAllCommentsFromPost)

// router.post('/likes', authentication.authenticateUserKey, postLikesController.addLikeToPost)
// router.delete('/likes', authentication.authenticateUserKey, postLikesController.deleteLikeFromPost)

module.exports = router