const express = require('express')
const router = express.Router()
const {login , signup, getUsers} = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')


router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/').get(authMiddleware ,  getUsers)

module.exports = router
