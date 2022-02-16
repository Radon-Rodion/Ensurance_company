const {Catalogue} = require("../models/models");

class CatalogueController {

    async getAll(req, res) {
        const type = await Catalogue.findAll()

        let entitiesArr=JSON.parse(JSON.stringify(type))
        let resp = {colNames: ["id", "addition_date","price_per_year","proposal_id"], data: []};
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].id, entitiesArr[i].addition_date,entitiesArr[i].price_per_year, entitiesArr[i].proposalProposalId]);
        }
        console.log(resp)
        return res.json(resp)
    }



}

module.exports = new CatalogueController()
