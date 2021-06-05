const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')


router.post('/registration', [
    check('username', 'The username field cannot be blank').notEmpty(),
    check('password', 'The password must be between 4 - 12 characters').isLength({min:4, max:12})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', [roleMiddleware(['USER', 'ADMIN']), authMiddleware], controller.getUser)

module.exports = router