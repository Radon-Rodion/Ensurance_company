import {models} from '../models/models';

let EnsuranceRequests = models.EnsuranceRequests;

class EnsuranceRequestsController {
    async getAll(req, res) {
        const type = await EnsuranceRequests.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await EnsuranceRequests.findOne(
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
            let date = new Date();
            const type = await EnsuranceRequests.create({
                //id: array.id,
                user_comment: array.user_comment,
                photo_approvement: array.photo_approvement,
                request_date: date,
                status: array.status,
                contractContractId: array.contractContractId,
                transactionTransactionId: array.transactionTransactionId,
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
            await EnsuranceRequests.update(
                {
                    user_comment: array.user_comment,
                    photo_approvement: array.photo_approvement,
                    request_date: array.request_date,
                    status: array.status,
                    contractContractId: array.contractContractId,
                    transactionTransactionId: array.transactionTransactionId,
                },
                {
                    where: {id: +array.id}
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
            await EnsuranceRequests.destroy({
                where: {id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const ensuranceRequestsController = new EnsuranceRequestsController();
export default ensuranceRequestsController;
