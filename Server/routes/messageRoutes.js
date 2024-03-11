const router = require('express').Router()
const {createMessage , fetchMessages } = require('../controllers/messagesContorllers')
const authMiddleware = require('../middleware/authMiddleware')


router.route('/').post(authMiddleware , createMessage)
router.route('/:chatId').get(authMiddleware , fetchMessages)


module.exports = router