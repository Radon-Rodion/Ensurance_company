import {models} from '../models/models';

let Selected = models.Selected;

class SelectedController {
    async getAll(req, res) {
        const type = await Selected.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Selected.findAll(
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
            const type = await Selected.create({
                id: array.id,
                adding_date: array.adding_date,
                catalogueId: array.catalogueId,
                userUserId: array.userUserId
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
            await Selected.update(
                {
                    adding_date: array.adding_date,
                    catalogueId: array.catalogueId,
                    userUserId: array.userUserId,
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
            await Selected.destroy({
                where: {id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const selectedController = new SelectedController();
export default selectedController;
