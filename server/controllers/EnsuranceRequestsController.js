const { EnsuranceRequests} = require('../models/models')

class EruranceRequestController {

    async getAll(req, res) {
        const type = await  EnsuranceRequests.findAll()

        let entitiesArr=JSON.parse(JSON.stringify(type))
        let resp = {colNames: ["user_comment", "photo_approvement","request_date","status","contract_id","transaction_id"], data: []};
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].user_comment, entitiesArr[i].photo_approvement,entitiesArr[i].request_date],
                entitiesArr[i].status,entitiesArr[i].contractContractId,entitiesArr[i].transactionTransactionId);
        }
        return res.json(resp)
    }

}

module.exports = new EruranceRequestController()
