const Router = require('express')
const router = new Router()
const contractsController = require('../controllers/ContractsController')


router.get('/', contractsController.getAll)

module.exports = router
