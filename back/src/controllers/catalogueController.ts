import {models} from '../models/models';
import {Proposal} from "../models/Proposal";
import {sequelize} from "../db";
import {QueryTypes} from "sequelize";

let Catalogue = models.Catalogue;

class CatalogueController {
    async getAll(req, res) {
        const type = await sequelize.query('SELECT id, addition_date, price_per_year, "proposalProposalId", "proposal_name", "description"\n' +
            '\tFROM public.catalogues JOIN proposals ON "proposalProposalId"="proposal_id";', {
            type: QueryTypes.SELECT
        })
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Catalogue.findOne(
            {
                attributes: {exclude: ['createdAt', 'updatedAt']},
                where: {id: +id}
            }
        );
        let entity = JSON.parse(JSON.stringify(type));
        const extra = await Proposal.findOne(
            {
                attributes: {exclude: ['createdAt', 'updatedAt', 'proposal_id']},
                where: {proposal_id: entity.proposalProposalId}
            }
        )
        const extraEntity = JSON.parse(JSON.stringify(extra));
        entity = {...entity, ...extraEntity};
        return res.json(entity);
    }

    async create(req, res) {
        try {
            let array = JSON.parse(JSON.stringify(req.body));
            let date = new Date();
            console.log(array);
            const type = await Catalogue.create({
                addition_date: date,
                price_per_year: array.price_per_year,
                proposalProposalId: array.id,
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
            await Catalogue.update(
                {
                    addition_date: array.addition_date,
                    price_per_year: array.price_per_year,
                    proposalProposalId: array.proposalProposalId,
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
            await Catalogue.destroy({
                where: {id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

}

const catalogueController = new CatalogueController();
export default catalogueController;
