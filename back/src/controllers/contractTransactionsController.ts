import {models} from '../models/models';

let ContractTransactions = models.ContractTransactions;

class ContractTransactionsController {
    async getAll(req, res) {
        const type = await ContractTransactions.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });

        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await ContractTransactions.findOne(
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
            const type = await ContractTransactions.create({
                transactionTransactionId: array.transactionTransactionId,
                contractContractId: array.contractContractId
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
            await ContractTransactions.update(
                {
                    transactionTransactionId: array.transactionTransactionId,
                    contractContractId: array.contractContractId,
                },
                {
                    where: {id: array.id}
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
            await ContractTransactions.destroy({
                where: {id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const contractTransactionsController = new ContractTransactionsController();
export default contractTransactionsController;
