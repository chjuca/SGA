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
    logging: true
}; 

const url = process.env.URL;
export const sequelize = new Sequelize(url);
