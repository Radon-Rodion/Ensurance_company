const {Selected} = require('../models/models')


class SelectedController {
    async getAll(req, res) {
        const type = await Selected.findAll()

        let entitiesArr=JSON.parse(JSON.stringify(type))
        let resp = {colNames: ["id", "catalogue_id","user_id"], data: []};
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].id, entitiesArr[i].catalogueId, entitiesArr[i].userUserId]);
        }
        return res.json(resp)
    }
}

module.exports = new SelectedController()
