import Sequelize from 'sequelize';
import {sequelize} from '../database/database';
import Area from '../models/Area';

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
});

Area.hasMany(Titulation,{as: 'titulaciones', foreignKey:'areaid', sourceKey : 'id'});
Titulation.belongsTo(Area,{ foreignKey:'areaid', sourceKey : 'id'});

export default Titulation;