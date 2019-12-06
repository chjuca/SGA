"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var Post = _database.sequelize.define('posts', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  description: {
    type: _sequelize["default"].STRING
  },
  autorid: {
    type: _sequelize["default"].STRING(10)
  },
  html: {
    type: _sequelize["default"].TEXT
  },
  title: {
    type: _sequelize["default"].STRING
  },
  categoryid: {
    type: _sequelize["default"].INTEGER
  }
}, {
  timestamps: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat',
  underscored: true
});

var _default = Post;
exports["default"] = _default;