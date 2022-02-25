import {models} from '../models/models';

let ContractTransactions = models.ContractTransactions;

class ContractTransactionsController {
    async getAll(req, res) {
        const type = await ContractTransactions.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        const resp = {
            colNames: [
                "id",
                "transaction_id",
                "contract_id"
            ],
            data: [],
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].id,
                entitiesArr[i].transactionTransactionId,
                entitiesArr[i].contractContractId
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (ContractTransactions: any) => {
        const arr = new Array<string>();
        return [
            ContractTransactions.id,
            ContractTransactions.transactionTransactionId,
            ContractTransactions.contractContractId
        ];
    }

    async create(req, res) {
        const [
            id,
            transaction_id,
            contract_id
        ] = req.body;
        const type = await ContractTransactions.create({
            id,
            transaction_id,
            contract_id
        });
        return res.json(ContractTransactionsController.parseRow(type));
    }

    async update(req, res) {
        let array = [];
        array = req.body.data;
        for (let i = 0; i < array.length; i++) {
            await ContractTransactions.update(
                {
                    transactionTransactionId: array[i][1],
                    contractContractId: array[i][2],
                },
                {
                    where: {id: array[i][0]}
                }
            )
        }
        return res.json(array);
    }

    async delete(req, res) {
        let id = req.path.toString().substring(1);
        console.log(id)
        await ContractTransactions.destroy({
            where: {id: +id}
        });
        res.sendStatus(200);
    }
}

const contractTransactionsController = new ContractTransactionsController();
export default contractTransactionsController;
