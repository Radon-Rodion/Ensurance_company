import {sequelize} from '../db';
import {DataTypes} from 'sequelize';

export const Transactions = sequelize.define('transactions', {
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