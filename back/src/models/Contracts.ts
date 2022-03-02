import {sequelize} from '../db';
import {DataTypes} from 'sequelize';

export const Contracts = sequelize.define('contracts', {
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
