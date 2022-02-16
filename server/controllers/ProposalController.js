const { Proposal} = require('../models/models')

class ProposalController {

    async getAll(req, res) {
        const type = await Proposal.findAll()

        let entitiesArr=JSON.parse(JSON.stringify(type))
        let resp = {colNames: ["proposal_id", "proposal_name","description"], data: []};
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].proposal_id, entitiesArr[i].proposal_name,entitiesArr[i].description]);
        }
        return res.json(resp)
    }

}

module.exports = new ProposalController()
