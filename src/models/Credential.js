import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const Credential = sequelize.define("credentials", {
    email : {
        type: Sequelize.STRING,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: Sequelize.STRING
    },
    userid: {
        type: Sequelize.STRING(10)
    }
}, {
    timestamps: false
});

Credential.removeAttribute('id');  // linea agregada para evitar error en el findOne() 

export default Credential;