import {models} from '../models/models';

let Catalogue = models.Catalogue;

class CatalogueController {
    async getAll(req, res) {
        const type = await Catalogue.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Catalogue.findAll(
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
            const type = await Catalogue.create({
                addition_date: array.addition_date,
                price_per_year: array.price_per_year,
                proposalProposalId: array.proposalProposalId,
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
