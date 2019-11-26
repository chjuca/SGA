import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const Category = sequelize.define('category',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING(50)
    },
    description:{
        type: Sequelize.STRING(80)
    },
    categoryid:{
        type: Sequelize.INTEGER,
    }
}, {
    timestamps: false,
    freezeTableName: true,

    // define the table's name
    //tableName: 'category'
});

export default Category;