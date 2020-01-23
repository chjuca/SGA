import Sequelize from 'sequelize';
import {sequelize} from '../database/database';
import Category from './Category';
import Titulation from './Titulation';

const User = sequelize.define('users',{
    ci:{
        type: Sequelize.STRING(10),
        primarykey: true,
        unique : true
    },
    name:{
        type: Sequelize.STRING(80)
    },
    lastname:{
        type: Sequelize.STRING(80)
    },
    dateofbirth:{
        type: Sequelize.DATE
    },
    role:{
        type: Sequelize.INTEGER
    },
    titulationid:{
        type: Sequelize.INTEGER
    },
    status:{
        type: Sequelize.BOOLEAN
    }
},{
    timestamps: false
})

User.hasOne(Category,{as: 'rol', foreignKey: 'id', sourceKey: 'role'});
Category.belongsTo(User, {foreignKey: 'id', sourceKey: 'role'});

User.hasOne(Titulation,{foreignKey: 'id', sourceKey: 'titulationid'});
Titulation.belongsTo(User, {foreignKey: 'id', sourceKey: 'titulationid'});

User.removeAttribute('id');  // linea agregada para evitar error en el findOne() 

export default User;
