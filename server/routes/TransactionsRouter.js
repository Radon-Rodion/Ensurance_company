const Router = require('express')
const router = new Router()
const transactionsController = require('../controllers/TransactionsController')


router.get('/', transactionsController.getAll)

module.exports = router
