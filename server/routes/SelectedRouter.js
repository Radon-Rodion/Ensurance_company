const Router = require('express')
const router = new Router()
const selectedController = require('../controllers/SelectedController')


router.get('/auth', selectedController.getAll)

module.exports = router
