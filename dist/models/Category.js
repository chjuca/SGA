"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var Category = _database.sequelize.define('category', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize["default"].STRING(50)
  },
  description: {
    type: _sequelize["default"].STRING(80)
  },
  categoryid: {
    type: _sequelize["default"].INTEGER
  }
}, {
  timestamps: false,
  freezeTableName: true // define the table's name
  //tableName: 'category'

});

var _default = Category;
exports["default"] = _default;