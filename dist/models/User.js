"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _database.sequelize.define('users', {
  ci: {
    type: _sequelize["default"].STRING(10),
    primarykey: true,
    unique: true
  },
  name: {
    type: _sequelize["default"].STRING(80)
  },
  lastname: {
    type: _sequelize["default"].STRING(80)
  },
  dateofbirth: {
    type: _sequelize["default"].DATE
  },
  role: {
    type: _sequelize["default"].INTEGER
  },
  status: {
    type: _sequelize["default"].BOOLEAN
  }
}, {
  timestamps: false
});

User.removeAttribute('id'); // linea agregada para evitar error en el findOne() 

var _default = User;
exports["default"] = _default;