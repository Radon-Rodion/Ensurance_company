const Router = require('express')
const router = new Router()
const proposalController = require('../controllers/ProposalController')

router.get('/', proposalController.getAll)

module.exports = router
