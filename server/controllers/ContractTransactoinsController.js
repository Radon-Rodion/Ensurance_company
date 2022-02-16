const { ContractTransactions} = require('../models/models')


class ContractTransactionsController {

    async getAll(req, res) {
        const type = await ContractTransactions.findAll()

        let entitiesArr=JSON.parse(JSON.stringify(type))
        let resp = {colNames: ["id", "transaction_Id","contract_id"], data: []};
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].id, entitiesArr[i].transactionTransactionId,entitiesArr[i].transactionTransactionId]);
        }
        return res.json(resp)
    }

}

module.exports = new ContractTransactionsController()
