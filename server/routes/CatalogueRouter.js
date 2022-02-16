const Router = require('express')
const router = new Router()
const catalogueController = require('../controllers/CatalogueController')

router.get('/', catalogueController.getAll)

module.exports = router
