import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const Assets = sequelize.define('assets',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING
    },
    asseturl:{
        type: Sequelize.STRING
    },
    publicid:{
        type : Sequelize.STRING,                    
        unique: true
    },
    categoryid:{
        type: Sequelize.INTEGER
    },
    userid:{
        type: Sequelize.STRING(10)
    }
},{
    timestamps: false
});

export default Assets;