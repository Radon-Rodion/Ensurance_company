import {models} from '../models/models';

let Contracts = models.Contracts;

class ContractsController {
    async getAll(req, res) {
        const type = await Contracts.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Contracts.findAll(
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
            const type = await Contracts.create({
                contract_id: array.contract_id,
                real_price: array.real_price,
                status: array.status,
                request_date: array.request_date,
                userUserId: array.userUserId,
                catalogueId: array.catalogueId
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
            await Contracts.update(
                {
                    real_price: array.real_price,
                    status: array.status,
                    request_date: array.request_date,
                    userUserId: array.userUserId,
                    catalogueId: array.catalogueId
                },
                {
                    where: {contract_id: array.contract_id}
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
            await Contracts.destroy({
                where: {contract_id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const ContractController = new ContractsController();
export default ContractController;
