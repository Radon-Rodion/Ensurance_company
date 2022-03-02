import {models} from '../models/models';

let Catalogue = models.Catalogue;

class CatalogueController {
    async getAll(req, res) {
        const type = await Catalogue.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        let resp = {
            colNames: [
                "id",
                "addition_date",
                "price_per_year",
                "proposal_id"
            ],
            data: []
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].id,
                entitiesArr[i].addition_date,
                entitiesArr[i].price_per_year,
                entitiesArr[i].proposalProposalId
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (Catalogue: any) => {
        const arr = new Array<string>();
        return [
            Catalogue.id,
            Catalogue.addition_date,
            Catalogue.price_per_year,
            Catalogue.proposalProposalId
        ];
    }

    async create(req, res) {
        try {
            let array = [];
            array = req.body;
            const type = await Catalogue.create({
                id: array[0],
                addition_date: array[1],
                price_per_year: array[2],
                proposalProposalId: array[3],
            });
            return res.json(CatalogueController.parseRow(type));
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = [];
            array = req.body;
            for (let i = 0; i < array.length; i++) {
                await Catalogue.update(
                    {
                        addition_date: array[i][1],
                        price_per_year: array[i][2],
                        proposalProposalId: array[i][3],
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
            await Catalogue.destroy({
                where: {id: +id}
            });
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

}

const catalogueController = new CatalogueController();
export default catalogueController;
