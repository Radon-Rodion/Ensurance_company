const { Roles} = require('../models/models')


class RolesController {

    async getAll(req, res) {
        const type = await Roles.findAll()

        let entitiesArr=JSON.parse(JSON.stringify(type))
        let resp = {colNames: ["role_id", "role_name"], data: []};
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].role_id, entitiesArr[i].role_name]);
        }
        return res.json(resp)
    }

}

module.exports = new RolesController()
