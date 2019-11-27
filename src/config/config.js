//============
//  PORT
//============

process.env.PORT = process.env.PORT || 3000;
//============
//  DATA BASE
//============

process.env.URL = process.env.URL || "postgres://postgres:admin@127.0.0.1:5432/SGA";

//============
//  Duration Token
//============

process.env.TOKENEXPIRATION = 60 * 60 * 24 * 30

//============
//  SEED of Athentication
//============

process.env.SEED = 'SGA-key'