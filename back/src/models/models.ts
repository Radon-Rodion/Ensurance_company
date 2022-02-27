import {sequelize} from '../db';
import {DataTypes} from 'sequelize';

const Proposal = sequelize.define('proposal', {
    proposal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        validate: {
            isInt: true,
        }
    },
    proposal_name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
});

const Catalogue = sequelize.define('catalogue', {
    addition_date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
        }
    },
    price_per_year: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true
        }
    },
});

const Selected = sequelize.define('selected', {
    adding_date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
        }
    },
});

const EnsuranceRequests = sequelize.define('ensurance_requests', {
    user_comment: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
    photo_approvement: {
        type: DataTypes.STRING, allowNull: true,
        validate: {
            isUrl: true
        }
    },
    request_date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
        }
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
});

const Contracts = sequelize.define('contracts', {
    contract_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true,
        }
    },
    real_price: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
        }
    },
    status: {
        type: DataTypes.STRING,
        validate: {

            notEmpty: true,
        }
    },
    request_date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
        }
    },
});

const Users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        validate: {
            isInt: true,
        }
    },
    first_name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
    last_name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
    passwordHash: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    passportNumber: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isPassportNumber(value) {
                let regExp = new RegExp("\\d{7}[A-Z]\\d{3}[A-Z]{2}\\d");
                if (!regExp.test(value)) {
                    throw new Error('Not correct passport number');
                }
            }
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isPhoneNumber(value) {
                let regExp = new RegExp("^((8|\\+374|\\+994|\\+995|\\+375|\\+7|\\+380|\\+38|\\+996|\\+998|\\+993)[\\- ]?)?\\(?\\d{3,5}\\)?[\\- ]?\\d{1}[\\- ]?\\d{1}[\\- ]?\\d{1}[\\- ]?\\d{1}[\\- ]?\\d{1}(([\\- ]?\\d{1})?[\\- ]?\\d{1})?$");
                if (!regExp.test(value)) {
                    throw new Error('Not correct phone number');
                }
            }
        }
    },
    bank_number: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isCreditCard: true,
            isCardNumber: true
        }
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
});

const Roles = sequelize.define('roles', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            notEmpty: true,
            isInt: true,
        }
    },
    role_name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
});

const Transactions = sequelize.define('transactions', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            notEmpty: true,
        }
    },
    transaction_sum: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: true,
            isInt: true,
        }
    },
    transaction_date: {
        type: DataTypes.DATE,
        validate: {
            notEmpty: true,
        }
    },
    sender_bank_number: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isCreditCard: true,

        }
    },
    reciever_bank_number: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isCreditCard: true,
        }
    },
});

const ContractTransactions = sequelize.define('contract_transactions', {});

Proposal.hasOne(Catalogue);
Catalogue.belongsTo(Proposal);

Catalogue.hasMany(Selected);
Selected.belongsTo(Catalogue);

Users.hasMany(Selected);
Selected.belongsTo(Users);

Roles.hasMany(Users);
Users.belongsTo(Roles);

Users.hasMany(Contracts);
Contracts.belongsTo(Users);

Catalogue.hasMany(Contracts);
Contracts.belongsTo(Catalogue);

EnsuranceRequests.belongsTo(Contracts);
EnsuranceRequests.belongsTo(Transactions);

Transactions.hasOne(ContractTransactions);
ContractTransactions.belongsTo(Transactions);

Contracts.hasMany(ContractTransactions);
ContractTransactions.belongsTo(Contracts);

export const models = {
    Proposal,
    Catalogue,
    Users,
    Selected,
    EnsuranceRequests,
    Roles,
    Transactions,
    Contracts,
    ContractTransactions,
};

//export default Proposal;

