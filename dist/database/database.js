"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

require('../config/config');

var dbconfig = {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    requiere: 30000,
    idle: 10000
  },
  logging: true
};
var url = process.env.URL;
var sequelize = new _sequelize["default"](url);
exports.sequelize = sequelize;