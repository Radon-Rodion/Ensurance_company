const Router = require('express')
const router = new Router()
const ensuranceRequestsController = require('../controllers/EnsuranceRequestsController')

router.get('/',  ensuranceRequestsController.getAll)

module.exports = router
