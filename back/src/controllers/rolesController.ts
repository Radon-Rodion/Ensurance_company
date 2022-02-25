import {models} from '../models/models';

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
        let [
            role_id,
            role_name
        ] = req.body;
        const type = await Roles.create({
            role_id,
            role_name
        });
        return res.json(RolesController.parseRow(type));
    }

    async delete(req, res) {
        let id = req.path.toString().substring(1);
        console.log(id)
        await Roles.destroy({
            where: {role_id: +id}
        });
        res.sendStatus(200);
    }

    async update(req, res) {
        let array = [];
        array = req.body.data;
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
        return res.json(array);
    }
}

const rolesController = new RolesController();
export default rolesController;
