import {sequelize} from '../db';
import {DataTypes} from 'sequelize';

export const Selected = sequelize.define('selected', {
    adding_date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
        }
    },
});