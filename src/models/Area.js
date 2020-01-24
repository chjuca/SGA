import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const Area = sequelize.define('area',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING(80)
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export default Area;