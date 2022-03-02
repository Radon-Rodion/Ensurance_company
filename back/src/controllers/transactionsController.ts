import {models} from '../models/models';

let Transactions = models.Transactions;

class TransactionsController {
    async getAll(req, res) {
        const type = await Transactions.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        const resp = {
            colNames: [
                "transaction_id",
                "transaction_sum",
                "transaction_date",
                "sender_bank_number",
                "reciever_bank_number"
            ],
            data: [],
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].transaction_id,
                entitiesArr[i].transaction_sum,
                entitiesArr[i].transaction_date,
                entitiesArr[i].sender_bank_number,
                entitiesArr[i].reciever_bank_number
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (Transactions: any) => {
        const arr = new Array<string>();
        return [
            Transactions.transaction_id,
            Transactions.transaction_sum,
            Transactions.transaction_date,
            Transactions.sender_bank_number,
            Transactions.reciever_bank_number,
        ];
    }

    async create(req, res) {
        try {
            let array = [];
            array = req.body;
            const type = await Transactions.create({
                transaction_id: array[0],
                transaction_sum: array[1],
                transaction_date: array[2],
                sender_bank_number: array[3],
                reciever_bank_number: array[4]
            });
            return res.json(TransactionsController.parseRow(type));
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = [];
            array = req.body;
            for (let i = 0; i < array.length; i++) {
                await Transactions.update(
                    {
                        transaction_sum: array[i][1],
                        transaction_date: array[i][2],
                        sender_bank_number: array[i][3],
                        reciever_bank_number: array[i][4],
                    },
                    {
                        where: {transaction_id: array[i][0]}
                    }
                )
            }
            return res.json(array);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async delete(req, res) {
        try {
            let id = req.path.toString().substring(1);
            console.log(id)
            await Transactions.destroy({
                where: {transaction_id: +id}
            });
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const transactionsController = new TransactionsController();
export default transactionsController;
