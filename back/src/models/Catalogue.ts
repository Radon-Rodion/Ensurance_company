import {sequelize} from '../db';
import {DataTypes} from 'sequelize';

export const Catalogue = sequelize.define('catalogue', {
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