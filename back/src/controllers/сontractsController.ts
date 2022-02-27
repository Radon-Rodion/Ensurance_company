import {models} from '../models/models';

let Contracts = models.Contracts;

class ContractsController {
    async getAll(req, res) {
        const type = await Contracts.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        let resp = {
            colNames: [
                "contract_id",
                "real_price",
                "status",
                "request_date",
                "user_id",
                "catalogue_id"
            ],
            data: []
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].contract_id,
                entitiesArr[i].real_price,
                entitiesArr[i].status,
                entitiesArr[i].request_date,
                entitiesArr[i].userUserId,
                entitiesArr[i].catalogueId
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (Contracts: any) => {
        const arr = new Array<string>();
        return [
            Contracts.contract_id,
            Contracts.real_price,
            Contracts.status,
            Contracts.request_date,
            Contracts.userUserId,
            Contracts.catalogueId
        ];
    }

    async create(req, res) {
        try {
            const [
                contract_id,
                real_price,
                status,
                request_date,
                user_id,
                catalogue_id
            ] = req.body;
            const type = await Contracts.create({
                contract_id,
                real_price,
                status,
                request_date,
                user_id,
                catalogue_id
            });
            return res.json(ContractsController.parseRow(type));
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = [];
            array = req.body.data;
            for (let i = 0; i < array.length; i++) {
                await Contracts.update(
                    {
                        real_price: array[i][1],
                        status: array[i][2],
                        request_date: array[i][3],
                        userUserId: array[i][4],
                        catalogueId: array[i][5],
                    },
                    {
                        where: {contract_id: array[i][0]}
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
            await Contracts.destroy({
                where: {contract_id: +id}
            });
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const ContractController = new ContractsController();
export default ContractController;
