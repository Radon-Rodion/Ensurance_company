const Router = require('express')
const router = new Router()
const userController = require('../controllers/UsersController')


router.get('/auth', userController.getAll)

module.exports = router
