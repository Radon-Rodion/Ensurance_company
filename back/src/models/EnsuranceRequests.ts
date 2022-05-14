import {sequelize} from '../db';
import {DataTypes} from 'sequelize';


export const EnsuranceRequests = sequelize.define('ensurance_requests', {
    user_comment: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
    photo_approvement: {
        type: DataTypes.STRING, allowNull: true,
        validate: {
            isUrl: true
        }
    },
    request_date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
        }
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
});
