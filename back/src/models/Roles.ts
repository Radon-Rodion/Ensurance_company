import {sequelize} from '../db';
import {DataTypes} from 'sequelize';

export const Roles = sequelize.define('roles', {
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
