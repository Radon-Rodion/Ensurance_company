const {Transactions} = require('../models/models')

class TransactionController {

    async getAll(req, res) {
        const type = await Transactions.findAll()

        let entitiesArr = JSON.parse(JSON.stringify(type))
        let resp = {
            colNames: ["transaction_id", "transaction_sum", "transaction_date", "sender_bank_number", "reciever_bank_number"],
            data: []
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].transaction_id, entitiesArr[i].transaction_sum,
                entitiesArr[i].transaction_date, entitiesArr[i].sender_bank_number, entitiesArr[i].reciever_bank_number]);
        }
        return res.json(resp)
    }

}

module.exports = new TransactionController()
