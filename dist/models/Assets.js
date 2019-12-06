"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var Assets = _database.sequelize.define('assets', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  imageurl: {
    type: _sequelize["default"].STRING
  },
  publicid: {
    type: _sequelize["default"].STRING
  },
  categoryid: {
    type: _sequelize["default"].INTEGER
  } // postId:{
  //     type : Sequelize.INTEGER                // Se agrega esta fk ?
  // }

}, {
  timestamps: false
});

var _default = Assets;
exports["default"] = _default;