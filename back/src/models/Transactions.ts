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
            isCreditCardNumber(value) {
                let regExp = new RegExp("(\\d{4}-){3}\\d{4}");
                if (!regExp.test(value)) {
                    throw new Error('Not correct credit card number');
                }
            }

        }
    },
    reciever_bank_number: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isCreditCardNumber(value) {
                let regExp = new RegExp("(\\d{4}-){3}\\d{4}");
                if (!regExp.test(value)) {
                    throw new Error('Not correct credit card number');
                }
            }
        }
    },
});