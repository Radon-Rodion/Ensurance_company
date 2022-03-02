import {models} from '../models/models';
import validator from "../validations/validator";

let Selected = models.Selected;

class SelectedController {
    async getAll(req, res) {
        const type = await Selected.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        const resp = {
            colNames: [
                "id",
                "adding_date",
                "catalogue_id",
                "user_id"
            ],
            data: [],
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].id,
                entitiesArr[i].adding_date,
                entitiesArr[i].catalogueId,
                entitiesArr[i].userUserId
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (Selected: any) => {
        const arr = new Array<string>();
        return [
            Selected.id,
            Selected.adding_date,
            Selected.catalogueId,
            Selected.userUserId,
        ];
    }

    async create(req, res) {
        try {
            let array = [];
            array = req.body;
            const type = await Selected.create({
                id: array[0],
                adding_date: array[1],
                catalogueId: array[2],
                userUserId: array[3]
            });
            return res.json(SelectedController.parseRow(type));
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = [];
            array = req.body.data;
            for (let i = 0; i < array.length; i++) {
                await Selected.update(
                    {
                        adding_date: array[i][1],
                        catalogueId: array[i][2],
                        userUserId: array[i][3],
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
            await Selected.destroy({
                where: {id: +id}
            });
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const selectedController = new SelectedController();
export default selectedController;
