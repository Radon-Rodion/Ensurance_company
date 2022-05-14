import {models} from '../models/models';

let Users = models.Users;

class UsersController {
    async getAll(req, res) {
        const type = await Users.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });
        const entitiesArr = JSON.parse(JSON.stringify(type));
        return res.json(entitiesArr);
    }

    async getOne(req, res) {
        let id = req.path.toString().substring(1);
        const type = await Users.findAll(
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
            const type = await Users.create({
                user_id: array.user_id,
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
            await Users.destroy({
                where: {user_id: +id}
            });
            res.sendStatus(204);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const usersController = new UsersController();
export default usersController;
