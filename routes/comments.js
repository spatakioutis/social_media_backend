const express = require('express')

const authentication = require('../middleware/authentication.js')
const postCommentsController = require('../controllers/postCommentsController.js')
const commentLikesController = require('../controllers/commentLikesController.js')

const router = express.Router()

router.post('/', authentication.authenticateUserKey, postCommentsController.addComment )
router.delete('/', authentication.authenticateUserKey, postCommentsController.deleteComment)
router.get('/', authentication.authenticateUserKey, postCommentsController.getAllCommentsFromPost)

router.post('/likes', authentication.authenticateUserKey, commentLikesController.addLikeToComment)
router.delete('/likes', authentication.authenticateUserKey, commentLikesController.deleteLikeFromComment)

module.exports = router