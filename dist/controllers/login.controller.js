"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _Credential = _interopRequireDefault(require("../models/Credential"));

var _User = _interopRequireDefault(require("../models/User"));

require('../config/config');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

function login(req, res) {
  var _req$body, email, password, emailFound, userFound, token;

  return _regenerator["default"].async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return _regenerator["default"].awrap(_Credential["default"].findOne({
            where: {
              email: email
            }
          }));

        case 4:
          emailFound = _context.sent;

          if (emailFound) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "The email or password is not correct",
            data: {}
          }));

        case 7:
          _context.next = 9;
          return _regenerator["default"].awrap(bcrypt.compareSync(password, emailFound.password));

        case 9:
          if (_context.sent) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "The email or password is not correct",
            data: {}
          }));

        case 11:
          _context.next = 13;
          return _regenerator["default"].awrap(_User["default"].findOne({
            // devolver el usuario o las credenciales ?
            where: {
              ci: emailFound.userid,
              status: true
            }
          }));

        case 13:
          userFound = _context.sent;

          if (userFound) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "The User does not exist",
            data: {}
          }));

        case 16:
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
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            message: "Something goes wrong",
            error: _context.t0
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 20]]);
}

;