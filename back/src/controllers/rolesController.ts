import {models} from '../models/models';
import validator from "../validations/validator";

let Roles = models.Roles;

class RolesController {
    async getAll(req, res) {
        const type = await Roles.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        const resp = {
            colNames: [
                "role_id",
                "role_name"
            ],
            data: [],
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].role_id,
                entitiesArr[i].role_name
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (Roles: any) => {
        const arr = new Array<string>();
        return [
            Roles.role_id,
            Roles.role_name
        ];
    }

    async create(req, res) {
        try {
            let array = [];
            array = req.body;
            const type = await Roles.create({
                role_id: array[0],
                role_name: array[1]

            });
            return res.json(RolesController.parseRow(type));
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
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = [];
            array = req.body;
            console.log(array[0][0]);
            for (let i = 0; i < array.length; i++) {
                await Roles.update(
                    {
                        role_name: array[i][1]
                    },
                    {
                        where: {role_id: array[i][0]}
                    }
                )
            }
            console.log(array);
            return res.json(array);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const rolesController = new RolesController();
export default rolesController;
