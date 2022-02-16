const Router = require('express')
const router = new Router()
const contractTransactoins = require('../controllers/ContractTransactoinsController')

router.get('/', contractTransactoins.getAll)

module.exports = router
