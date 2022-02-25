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
            Catalogue.adding_date,
            Catalogue.catalogueId,
            Catalogue.proposalProposalId
        ];
    }

    async create(req, res) {
        const [
            id,
            adding_date,
            catalogue_id,
            proposal_id
        ] = req.body;
        const type = await Catalogue.create({
            id,
            adding_date,
            catalogue_id,
            proposal_id
        });
        return res.json(CatalogueController.parseRow(type));
    }

    async update(req, res) {
        let array = [];
        array = req.body.data;
        for (let i = 0; i < array.length; i++) {
            await Catalogue.update(
                {
                    adding_date: array[i][1],
                    catalogueId: array[i][2],
                    proposalProposalId: array[i][3],
                },
                {
                    where: {id: array[i][0]}
                }
            )
        }
        return res.json(array);
    }

    async delete(req, res) {
        let id = req.path.toString().substring(1);
        console.log(id)
        await Catalogue.destroy({
            where: {id: +id}
        });
        res.sendStatus(200);
    }

}

const catalogueController = new CatalogueController();
export default catalogueController;
