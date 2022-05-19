import {models} from '../models/models';
import {sequelize} from "../db";
import {QueryTypes} from "sequelize";

let Selected = models.Selected;

class SelectedController {
    async getAll(req, res) {
        const type = await sequelize.query('SELECT selecteds.id, "adding_date","catalogueId",\n' +
            '"price_per_year", "proposalProposalId", "description", "proposal_name"\n' +
            'FROM public.selecteds LEFT JOIN catalogues ON "catalogueId"=catalogues.id\n' +
            'LEFT JOIN proposals ON "proposalProposalId"=proposal_id', {
            type: QueryTypes.SELECT
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await sequelize.query('SELECT selecteds.id, "adding_date","catalogueId",\n' +
            '"price_per_year", "proposalProposalId", "description", "proposal_name"\n' +
            'FROM public.selecteds LEFT JOIN catalogues ON "catalogueId"=catalogues.id\n' +
            'LEFT JOIN proposals ON "proposalProposalId"=proposal_id WHERE selecteds.id=' + (id) + ';', {
            type: QueryTypes.SELECT
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        console.log(entitiesArr.length);
        if (entitiesArr.length == 0) {
            res.status(404).send();
        } else {
            return res.json(entitiesArr[0]);
        }
    }

    async create(req, res) {
        try {
            let array = JSON.parse(JSON.stringify(req.body));
            let date = new Date();
            const type = await Selected.create({
                //id: array.id,
                adding_date: date,
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
