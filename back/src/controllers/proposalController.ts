import {models} from '../models/models';
import {query} from "express";
import {sequelize} from "../db";

let Proposal = models.Proposal;

class ProposalController {
    async getAll(req, res) {
        const type = await Proposal.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });

        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Proposal.findOne(
            {
                attributes: {exclude: ['createdAt', 'updatedAt']},
                where: {proposal_id: +id}
            }
        );
        const entity = JSON.parse(JSON.stringify(type));
        return res.json(entity);
    }

    async create(req, res) {
        try {
            let array = JSON.parse(JSON.stringify(req.body));
            const type = await Proposal.create({
                proposal_id: array.proposal_id,
                proposal_name: array.proposal_name,
                description: array.description
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
            await Proposal.update(
                {
                    proposal_name: array.proposal_name,
                    description: array.description,
                },
                {
                    where: {proposal_id: array.proposal_id}
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
            await Proposal.destroy({
                where: {proposal_id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const proposalController = new ProposalController();
export default proposalController;
