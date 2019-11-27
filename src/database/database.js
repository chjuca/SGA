require('../config/config');
import Sequelize from 'sequelize';

const dbconfig = {
    host: 'localhost',
    dialect: 'postgres',
    pool:{
        max: 5,
        min: 0,
        requiere: 30000,
        idle: 10000
    },
    logging: false
}; 

const url = "postgres://postgres:admin@SGA:5432";
export const sequelize = new Sequelize(url);
