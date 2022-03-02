import {models} from '../models/models';

let Users = models.Users;

class UsersController {
    async getAll(req, res) {
        const type = await Users.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        const resp = {
            colNames: [
                'user_id',
                'first_name',
                'last_name',
                'passwordHash',
                'email',
                'passportNumber',
                'phone_number',
                'bank_number',
                'status',
                'role_id',
            ],
            data: [],
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].user_id,
                entitiesArr[i].first_name,
                entitiesArr[i].last_name,
                entitiesArr[i].passwordHash,
                entitiesArr[i].email,
                entitiesArr[i].passportNumber,
                entitiesArr[i].phone_number,
                entitiesArr[i].bank_number,
                entitiesArr[i].status,
                entitiesArr[i].roleRoleId,
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (user: any) => {
        const arr = new Array<string>();
        return [
            user.user_id,
            user.first_name,
            user.last_name,
            user.passwordHash,
            user.email,
            user.passportNumber,
            user.phone_number,
            user.bank_number,
            user.status,
            user.roleRoleId
        ];
    }

    async create(req, res) {
        try {
            let array = [];
            array = req.body;
            const type = await Users.create({
                user_id: array[0],
                first_name: array[1],
                last_name: array[2],
                passwordHash: array[3],
                email: array[4],
                passportNumber: array[5],
                phone_number: array[6],
                bank_number: array[7],
                status: array[8],
                roleRoleId: array[9]
            });
            return res.json(UsersController.parseRow(type));
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
            let array = [];
            array = req.body;
            for (let i = 0; i < array.length; i++) {
                await Users.update(
                    {
                        first_name: array[i][1],
                        last_name: array[i][2],
                        passwordHash: array[i][3],
                        email: array[i][4],
                        passportNumber: array[i][5],
                        phone_number: array[i][6],
                        bank_number: array[i][7],
                        status: array[i][8],
                        roleRoleId: array[i][9],
                    },
                    {
                        where: {user_id: array[i][0]}
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
            await Users.destroy({
                where: {user_id: +id}
            });
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const usersController = new UsersController();
export default usersController;
