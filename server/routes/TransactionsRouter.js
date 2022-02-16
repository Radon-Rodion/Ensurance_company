const Router = require('express')
const router = new Router()
const transactionsController = require('../controllers/TransactionsController')


router.get('/auth', transactionsController.getAll)

module.exports = router
