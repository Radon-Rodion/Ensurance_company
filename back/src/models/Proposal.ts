import {sequelize} from '../db';
import {DataTypes} from 'sequelize';

export const Proposal = sequelize.define('proposal', {
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
