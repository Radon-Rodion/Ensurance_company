import {models} from '../models/models';
import {sequelize} from "../db";
import {QueryTypes} from "sequelize";
const jwt = require('jsonwebtoken')

let Users = models.Users;


const generateJWT = (id: any, email: any, role_id: any) => {
    return jwt.sign({id, email, role_id}, "secret_key", {expiresIn: '24h'})
}



class UsersController {


    async registration(req: any, res: any) {
        try {
            let array = JSON.parse(JSON.stringify(req.body));
            const type = await Users.create({
                first_name: array.first_name,
                last_name: array.last_name,
                passwordHash: array.passwordHash,
                email: array.email,
                passportNumber: array.passportNumber,
                phone_number: array.phone_number,
                bank_number: array.bank_number,
                status: "active",
                roleRoleId: 2
            });
            const entity = JSON.parse(JSON.stringify(type));
            const token = generateJWT(entity.user_id, entity.email, entity.roleRoleId);
            return res.json({token});
        } catch (e: any) {
            res.status(402).send(e.message);
        }
    }





    async login(req: any, res: any) {
        let array = JSON.parse(JSON.stringify(req.body));
        const type = await Users.findOne(
            {
                attributes: {exclude: ['createdAt', 'updatedAt']},
                where: {email: array.email, passwordHash: array.passwordHash}
            }
        );
        const entity = JSON.parse(JSON.stringify(type));
        if (entity == null) {
            res.status(402).send("No exicsting")
        } else {
            console.log(entity)
            const token = generateJWT(entity.user_id, entity.email, entity.roleRoleId);
            return res.json({token});
        }

    }



    async getAll(req, res) {
        const type = await sequelize.query('SELECT user_id, first_name, last_name, "passwordHash", email, "passportNumber", phone_number, bank_number, status, "roleRoleId", "role_name"\n' +
            '\tFROM public.users JOIN "roles" ON "roleRoleId"="role_id";', {
            type: QueryTypes.SELECT
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await sequelize.query('SELECT user_id, first_name, last_name, "passwordHash", email, "passportNumber", phone_number, bank_number, status, "roleRoleId", "role_name"\n' +
            '\tFROM public.users JOIN "roles" ON "roleRoleId"="role_id" WHERE user_id=' + (id) + ';', {
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
            const type = await Users.create({
                //user_id: array.user_id,
                first_name: array.first_name,
                last_name: array.last_name,
                passwordHash: array.passwordHash,
                email: array.email,
                passportNumber: array.passportNumber,
                phone_number: array.phone_number,
                bank_number: array.bank_number,
                status: array.status,
                roleRoleId: array.role_id
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
            await Users.update(
                {
                    first_name: array.first_name,
                    last_name: array.last_name,
                    passwordHash: array.passwordHash,
                    email: array.email,
                    passportNumber: array.passportNumber,
                    phone_number: array.phone_number,
                    bank_number: array.bank_number,
                    status: array.status,
                    roleRoleId: array.role_id
                },
                {
                    where: {user_id: array.user_id}
                }
            ).then((record) => {
                console.log(record.toString() == '0')
                /* if (record.toString() == '0'){
                     res.status(406).send("Invalid id");
                     return
                 }*/
            })
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async delete(req, res) {
        try {
            let id = req.path.toString().substring(1);
            console.log(id)
            await Users.destroy({
                where: {user_id: +id}
            }).then((record) => {
                console.log(record.toString() == '0')
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

}

const usersController = new UsersController();
export default usersController;
