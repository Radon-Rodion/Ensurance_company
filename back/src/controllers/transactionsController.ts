import {models} from '../models/models';

let Transactions = models.Transactions;

class TransactionsController {
    async getAll(req, res) {
        const type = await Transactions.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Transactions.findAll(
            {
                attributes: {exclude: ['createdAt', 'updatedAt']},
                where: {id: +id}
            }
        );
        const entity = JSON.parse(JSON.stringify(type));
        return res.json(entity);
    }

    async create(req, res) {
        try {
            let array = JSON.parse(JSON.stringify(req.body));
            const type = await Transactions.create({
                transaction_id: array.transaction_id,
                transaction_sum: array.transaction_sum,
                transaction_date: array.transaction_date,
                sender_bank_number: array.sender_bank_number,
                reciever_bank_number: array.reciever_bank_number
            });
            const entity = JSON.parse(JSON.stringify(type));
            return res.json(entity);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = JSON.parse(JSON.stringify(req.body));
            await Transactions.update(
                {
                    transaction_sum: array.transaction_sum,
                    transaction_date: array.transaction_date,
                    sender_bank_number: array.sender_bank_number,
                    reciever_bank_number: array.reciever_bank_number,
                },
                {
                    where: {transaction_id: array.transaction_id}
                }
            )
            res.sendStatus(200);
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
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const transactionsController = new TransactionsController();
export default transactionsController;
