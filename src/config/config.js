//============
//  ENTORNO
//============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//============
//  PORT
//============

process.env.PORT = process.env.PORT || 3000;
//============

//  DATA BASE
//============

//process.env.DATABASE_URL= process.env.DATABASE_URL || "postgres://postgres:admin@127.0.0.1:5432/SGA"; //url

if(process.env.NODE_ENV==='dev'){
    process.env.DATABASE_URL = "postgres://postgres:admin@127.0.0.1:5432/SGA";
}else{
    process.env.DATABASE_URL = process.env.DATABASE_URL
}

//============
//  Duration Token
//============

process.env.TOKENEXPIRATION = 60 * 60 * 24 * 30

//============
//  SEED of Athentication
//============

process.env.SEED = 'SGA-key'

//============
//  USER AND PASS EMAIL
//============

process.env.USER = 'ascenderetest@gmail.com';
process.env.PASS = 'gt7nvHmU';
