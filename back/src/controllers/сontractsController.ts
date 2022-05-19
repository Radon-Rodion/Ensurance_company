import {models} from '../models/models';
import {sequelize} from "../db";
import {Catalogue} from "../models/Catalogue";
import {QueryTypes} from "sequelize";

let Contracts = models.Contracts;

class ContractsController {
    async getAll(req, res) {
        /*const type = await Contracts.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });*/
        const type = await sequelize.query('SELECT contract_id, real_price, contracts.status, "userUserId","catalogueId",\n' +
            '"addition_date", "request_date", "price_per_year", "proposalProposalId", "description", "proposal_name"\n' +
            'FROM public.contracts LEFT JOIN catalogues ON "catalogueId"=catalogues.id\n' +
            'LEFT JOIN proposals ON "proposalProposalId"=proposal_id', {
            type: QueryTypes.SELECT
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await sequelize.query('SELECT contract_id, real_price, contracts.status, "userUserId","catalogueId",\n' +
            '"addition_date", "request_date", "price_per_year", "proposalProposalId", "description", "proposal_name"\n' +
            'FROM public.contracts LEFT JOIN catalogues ON "catalogueId"=catalogues.id\n' +
            'LEFT JOIN proposals ON "proposalProposalId"=proposal_id WHERE "contract_id"=' +(id) +';', {
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

            const type = await Contracts.create({
                //contract_id: array.contract_id,
                real_price: array.real_price,//достать из каталога
                status: "requested",//установить на "requested"
                request_date: date,
                userUserId: array.userUserId,
                catalogueId: array.catalogueId
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
