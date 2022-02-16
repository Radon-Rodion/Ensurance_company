const {Users} = require('../models/models')

class UserController {

    async getAll(req, res) {
        const type = await Users.findAll()

        let entitiesArr = JSON.parse(JSON.stringify(type))
        let resp = {
            colNames: ["user_id", "first_name", "last_name", "passwordHash", "email",
                "passportNumber", "phone_number", "bank_number", "status", "role_id"], data: []
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([entitiesArr[i].user_id, entitiesArr[i].first_name, entitiesArr[i].last_name,
                entitiesArr[i].passwordHash, entitiesArr[i].email, entitiesArr[i].passportNumber,
                entitiesArr[i].phone_number, entitiesArr[i].bank_number, entitiesArr[i].status, entitiesArr[i].roleRoleId]);
        }
        return res.json(resp)
    }

}

module.exports = new UserController()
