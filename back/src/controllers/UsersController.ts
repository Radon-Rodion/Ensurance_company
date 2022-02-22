import Users from '../models/models';

class UserController {
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
    return [user.user_id, user.first_name, user.last_name, user.passwordHash, user.email, user.passportNumber, user.phone_number, user.bank_number, user.status, user.roleRoleId];
  }

  async create(req, res) {
    const [user_id , first_name, last_name, passwordHash, email, passportNumber, phone_number, bank_number, status, role_id]  = req.body;
    const type = await Users.create({user_id , first_name, last_name, passwordHash, email, passportNumber, phone_number, bank_number, status, role_id}); 
    return res.json(UserController.parseRow(type));
  }
}

const userController = new UserController();
export default userController;
