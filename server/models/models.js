const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Proposal = sequelize.define('proposal', {
    proposal_id:{type: DataTypes.INTEGER, primaryKey: true},
    proposal_name:{type: DataTypes.STRING},
    description:{type: DataTypes.STRING}
})

const Catalogue = sequelize.define('catalogue', {
    proposal_id: {type: DataTypes.INTEGER, primaryKey: true},
    addition_date: {type: DataTypes.DATE},
    price_per_year: {type: DataTypes.INTEGER},
})

const Selected = sequelize.define('selected', {
    //id:{type: DataTypes.INTEGER, primaryKey: true},
    // user_id: {type: DataTypes.INTEGER},
    // proposal_id: {type: DataTypes.INTEGER},
    adding_date: {type: DataTypes.DATE},
})

const EnsuranceRequests = sequelize.define('ensurance_requests', {
    // contract_id: {type: DataTypes.INTEGER},
    user_comment: {type: DataTypes.STRING},
    photo_approvement: {type: DataTypes.BLOB},
    request_date: {type: DataTypes.DATE},
    status: {type: DataTypes.STRING},
    // transaction_id: {type: DataTypes.INTEGER},
})

const Contracts = sequelize.define('contracts', {
    contract_id: {type: DataTypes.INTEGER, primaryKey: true},
    // user_id: {type: DataTypes.INTEGER},
    // proposal_id: {type: DataTypes.INTEGER},
    real_price: {type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING},
    request_date: {type: DataTypes.DATE},
})

const Users = sequelize.define('users', {
    user_id: {type: DataTypes.INTEGER, primaryKey: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    passwordHash: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    passportNumber: {type: DataTypes.STRING},
    phone_number: {type: DataTypes.STRING},
    bank_number: {type: DataTypes.STRING},
    // role_id: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
})

const Roles = sequelize.define('roles', {
    role_id: {type: DataTypes.INTEGER, primaryKey: true},
    role_name: {type: DataTypes.STRING},
})

const Transactions = sequelize.define('transactions', {
    transaction_id: {type: DataTypes.INTEGER, primaryKey: true},
    transaction_sum: {type: DataTypes.INTEGER},
    transaction_date: {type: DataTypes.DATE},
    sender_bank_number: {type: DataTypes.STRING},
    reciever_bank_number: {type: DataTypes.STRING},
})

const ContractTransactions = sequelize.define('contract_transactions', {
   // contract_id: {type: DataTypes.INTEGER},
   // transaction_id: {type: DataTypes.INTEGER},
})


Proposal.hasOne(Catalogue)
Catalogue.belongsTo(Proposal)

Catalogue.hasMany(Selected)
Selected.belongsTo(Catalogue)

Users.hasMany(Selected)
Selected.belongsTo(Users)

Roles.hasMany(Users)
Users.belongsTo(Roles)

Users.hasMany(Contracts)
Contracts.belongsTo(Users)

Catalogue.hasMany(Contracts)
Contracts.belongsTo(Catalogue)

Transactions.hasOne(ContractTransactions)
ContractTransactions.belongsTo(Transactions)

ContractTransactions.hasMany(Contracts)
Contracts.belongsTo(ContractTransactions)

////////////////////////////////


module.exports = {
    Proposal,
    Catalogue,
    Users,
    Selected,
    EnsuranceRequests,
    Roles,
    Transactions,
    Contracts,
    ContractTransactions
}





