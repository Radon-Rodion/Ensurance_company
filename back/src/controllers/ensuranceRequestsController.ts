import {models} from '../models/models';

let EnsuranceRequests = models.EnsuranceRequests;

class EnsuranceRequestsController {
    async getAll(req, res) {
        const type = await EnsuranceRequests.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        const resp = {
            colNames: [
                "id",
                "user_comment",
                "photo_approvement",
                "request_date",
                "status",
                "contract_id",
                "transaction_id"
            ],
            data: [],
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].id,
                entitiesArr[i].user_comment,
                entitiesArr[i].photo_approvement,
                entitiesArr[i].request_date,
                entitiesArr[i].status,
                entitiesArr[i].contractContractId,
                entitiesArr[i].transactionTransactionId
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (EnsuranceRequests: any) => {
        const arr = new Array<string>();
        return [
            EnsuranceRequests.id,
            EnsuranceRequests.user_comment,
            EnsuranceRequests.photo_approvement,
            EnsuranceRequests.request_date,
            EnsuranceRequests.status,
            EnsuranceRequests.contractContractId,
            EnsuranceRequests.transactionTransactionId,
        ];
    }

    async create(req, res) {
        try {
            const [
                id,
                user_comment,
                photo_approvement,
                request_date,
                status,
                contract_id,
                transaction_id
            ] = req.body;
            const type = await EnsuranceRequests.create({
                id,
                user_comment,
                photo_approvement,
                request_date,
                status,
                contract_id,
                transaction_id
            });
            return res.json(EnsuranceRequestsController.parseRow(type));
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = [];
            array = req.body.data;
            for (let i = 0; i < array.length; i++) {
                await EnsuranceRequests.update(
                    {
                        user_comment: array[i][1],
                        photo_approvement: array[i][2],
                        request_date: array[i][3],
                        status: array[i][4],
                        contractContractId: array[i][5],
                        transactionTransactionId: array[i][6],
                    },
                    {
                        where: {id: array[i][0]}
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
            await EnsuranceRequests.destroy({
                where: {id: +id}
            });
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const ensuranceRequestsController = new EnsuranceRequestsController();
export default ensuranceRequestsController;
