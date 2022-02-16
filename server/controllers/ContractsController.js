const { Contracts} = require('../models/models')

class ContractsController {
    async getAll(req, res) {
        const type = await Contracts.findAll()

        let entitiesArr=JSON.parse(JSON.stringify(type))
        let resp = {colNames: ["contract_id", "real_price","status","request_date","user_id","catalogue_id"], data: []};
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].contract_id, entitiesArr[i].real_price,entitiesArr[i].status,
                entitiesArr[i].request_date], entitiesArr[i].userUserId,entitiesArr[i].catalogueId);
        }
        return res.json(resp)
    }

}

module.exports = new ContractsController()
