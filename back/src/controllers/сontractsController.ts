import {models} from '../models/models';
import {sequelize} from "../db";
import {QueryTypes} from "sequelize";
import {Catalogue} from "../models/Catalogue";

let Contracts = models.Contracts;

class ContractsController {
    async getAll(req, res) {
        /*const type = await Contracts.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });*/
        const type = await sequelize.query('SELECT selecteds.id, adding_date, "catalogueId", "userUserId", "addition_date",\n' +
            '"price_per_year", "proposalProposalId","proposal_name"\n' +
            'FROM public.selecteds JOIN catalogues ON "catalogueId"="catalogueId"\n' +
            'JOIN proposals ON "proposalProposalId"="proposal_id"', {
            type: QueryTypes.SELECT
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Contracts.findOne(
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

            const price = await Catalogue.findOne(
                {
                    where: {id: array.catalogue_id}
                }
            )
            const price2 = JSON.parse(JSON.stringify(price));
            const type = await Contracts.create({
                //contract_id: array.contract_id,
                real_price: price2.price_per_year,//достать из каталога
                status: "requested",//установить на "requested"
                request_date: date,
                userUserId: array.user_id,
                catalogueId: array.catalogue_id
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
            await Contracts.update(
                {
                    real_price: array.real_price,
                    status: array.status,
                    request_date: array.request_date,
                    userUserId: array.userUserId,
                    catalogueId: array.catalogueId
                },
                {
                    where: {contract_id: array.contract_id}
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
            await Contracts.destroy({
                where: {contract_id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const ContractController = new ContractsController();
export default ContractController;
