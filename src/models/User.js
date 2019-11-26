import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

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
    status:{
        type: Sequelize.BOOLEAN
    }
},{
    timestamps: false
})
User.removeAttribute('id');  // linea agregada para evitar error en el findOne() 

export default User;
