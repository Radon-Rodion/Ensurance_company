import {sequelize} from '../db';
import {DataTypes} from 'sequelize';
import {Proposal} from "./Proposal";
import {Catalogue} from "./Catalogue";
import {Selected} from "./Selected";
import {EnsuranceRequests} from "./EnsuranceRequests";
import {Contracts} from "./Contracts";
import {Users} from "./Users";
import {Roles} from "./Roles";
import {Transactions} from "./Transactions";

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

