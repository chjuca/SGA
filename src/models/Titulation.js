import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const Titulation = sequelize.define('titulation',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING(80)
    },
    description:{
        type: Sequelize.STRING(180)
    },
    areaid:{
        type: Sequelize.INTEGER,
    }
}, {
    timestamps: false,
    freezeTableName: true,

    // define the table's name
    //tableName: 'category'
});

export default Titulation;