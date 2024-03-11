const router = require('express').Router()

const {accessChat, fetchChat, createGroupe} = require('../controllers/chatControllers')
const authMiddleware = require('../middleware/authMiddleware')



router.route('/').post(authMiddleware , accessChat)
router.route('/').get(authMiddleware , fetchChat)
router.route('/group').post(authMiddleware , createGroupe)


module.exports = router