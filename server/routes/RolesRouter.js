const Router = require('express')
const router = new Router()
const rolesController = require('../controllers/RolesController')


router.get('/auth', rolesController.getAll)

module.exports = router
