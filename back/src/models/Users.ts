import {sequelize} from '../db';
import {DataTypes} from 'sequelize';

export const Users = sequelize.define('users', {
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
        }
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
});
