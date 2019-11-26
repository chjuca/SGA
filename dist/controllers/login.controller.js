"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

var _Credential = _interopRequireDefault(require("../models/Credential"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('../config/config');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

function login(req, res) {
  var _req$body, email, password, emailFound, userFound, token;

  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Credential["default"].findOne({
            where: {
              email: email
            }
          }));

        case 3:
          emailFound = _context.sent;

          if (emailFound) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "The email or password is not correct",
            data: {}
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compareSync(password, emailFound.password));

        case 8:
          if (_context.sent) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "The email or password is not correct",
            data: {}
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            // devolver el usuario o las credenciales ?
            where: {
              ci: emailFound.userid,
              status: true
            }
          }));

        case 12:
          userFound = _context.sent;

          if (userFound) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "The User does not exist",
            data: {}
          }));

        case 15:
          token = jwt.sign({
            data: userFound
          }, process.env.SEED, {
            expiresIn: process.env.TOKENEXPIRATION
          });
          res.json({
            message: "Welcome!",
            data: userFound,
            token: token
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}

;