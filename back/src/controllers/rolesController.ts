import {models} from '../models/models';

let Roles = models.Roles;

class RolesController {
    async getAll(req, res) {
        const type = await Roles.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Roles.findOne(
            {
                attributes: {exclude: ['createdAt', 'updatedAt']},
                where: {role_id: +id}
            }
        );
        const entity = JSON.parse(JSON.stringify(type));
        if (entity == null) {
            res.status(404).send("No id");
        } else {
            return res.json(entity);
        }
    }

    async create(req, res) {
        try {
            let array = JSON.parse(JSON.stringify(req.body));
            const type = await Roles.create({
                role_name: array.role_name
            });
            const entity = JSON.parse(JSON.stringify(type));
            return res.json(entity);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async delete(req, res) {
        try {
            let id = req.path.toString().substring(1);
            console.log(id)
            await Roles.destroy({
                where: {role_id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = JSON.parse(JSON.stringify(req.body));
            console.log(array);
            const type = await Roles.update(
                {
                    role_name: array.role_name
                },
                {
                    where: {role_id: array.role_id}
                }
            )
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const rolesController = new RolesController();
export default rolesController;
