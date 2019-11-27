"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.getOneUser = getOneUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Credential = _interopRequireDefault(require("../models/Credential"));

var bcrypt = require('bcryptjs');

function getUsers(req, res) {
  var users;
  return _regenerator["default"].async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _regenerator["default"].awrap(_User["default"].findAll({
            where: {
              status: true
            }
          }));

        case 3:
          users = _context.sent;
          res.json({
            data: users
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "Something goes wrong",
            error: _context.t0
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function createUser(req, res) {
  var _req$body, ci, name, lastname, dateofbirth, role, email, password, emailFound, newUser, newCredential;

  return _regenerator["default"].async(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, ci = _req$body.ci, name = _req$body.name, lastname = _req$body.lastname, dateofbirth = _req$body.dateofbirth, role = _req$body.role, email = _req$body.email, password = _req$body.password;
          _context2.prev = 1;
          _context2.next = 4;
          return _regenerator["default"].awrap(_Credential["default"].findOne({
            where: {
              email: email
            }
          }));

        case 4:
          emailFound = _context2.sent;

          if (!emailFound) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            "message": "Something goes wrong",
            "data": "Ya existe la llave (email) = " + email
          }));

        case 7:
          _context2.next = 9;
          return _regenerator["default"].awrap(_User["default"].create({
            ci: ci,
            name: name,
            lastname: lastname,
            dateofbirth: dateofbirth,
            role: role
          }, {
            fields: ['ci', 'name', 'lastname', 'dateofbirth', 'role']
          }));

        case 9:
          newUser = _context2.sent;
          _context2.next = 12;
          return _regenerator["default"].awrap(_Credential["default"].create({
            email: email,
            password: String(bcrypt.hashSync(password, 10)),
            // traer metodo desde controller o dejarlo aqui?
            userid: ci
          }, {
            fields: ['email', 'password', 'userid']
          }));

        case 12:
          newCredential = _context2.sent;

          if (!newUser) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.json({
            message: "User created successfully",
            data: {
              newUser: newUser,
              newCredential: newCredential
            }
          }));

        case 15:
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Something goes wrong',
            error: _context2.t0
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 17]]);
}

function getOneUser(req, res) {
  var ci, user;
  return _regenerator["default"].async(function getOneUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ci = req.params.ci;
          _context3.prev = 1;
          _context3.next = 4;
          return _regenerator["default"].awrap(_User["default"].findOne({
            where: {
              ci: ci,
              status: true
            }
          }));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "User with ci: " + ci + " does not exist."
          }));

        case 7:
          res.json({
            message: "User gotten successfully ",
            data: user
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            message: "Something goes wrong",
            error: _context3.t0
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

function deleteUser(req, res) {
  var ci, deleteRowCount;
  return _regenerator["default"].async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ci = req.params.ci;
          _context4.prev = 1;
          _context4.next = 4;
          return _regenerator["default"].awrap(_User["default"].update({
            status: false
          }, {
            where: {
              ci: ci,
              status: true
            }
          }));

        case 4:
          deleteRowCount = _context4.sent;

          if (!(deleteRowCount === 0)) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: "Can't be deleted because the CI: " + ci + " does not exist",
            data: "Deleted rows " + deleteRowCount
          }));

        case 7:
          res.json({
            message: "User deleted successfully",
            data: "Deleted rows" + deleteRowCount
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json({
            message: 'Something goes wrong',
            data: _context4.t0
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

function updateUser(req, res) {
  var ci, _req$body2, name, lastname, dateofbirth, role, updateRowCount;

  return _regenerator["default"].async(function updateUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          ci = req.params.ci;
          _req$body2 = req.body, name = _req$body2.name, lastname = _req$body2.lastname, dateofbirth = _req$body2.dateofbirth, role = _req$body2.role; //Que el usuario pueda modificar su email y su rol ?
          // const userFound = await User.findOne({
          //     atributes: ["name", "lastname", "dateofbirth", "role"],
          //     where:{
          //         ci
          //     }
          // });
          // if(!userFound){
          //     return res.status(400).json({
          //         message: "usuario con ci:"+ ci+"no existe"
          //     })
          // }

          _context5.prev = 2;
          _context5.next = 5;
          return _regenerator["default"].awrap(_User["default"].update({
            name: name,
            lastname: lastname,
            dateofbirth: dateofbirth,
            role: role
          }, {
            where: {
              ci: ci,
              status: true
            }
          }));

        case 5:
          updateRowCount = _context5.sent;

          if (!(updateRowCount == 0)) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: "Can't be updated because the CI: " + ci + " does not exist",
            data: "Updated rows " + updateRowCount
          }));

        case 8:
          return _context5.abrupt("return", res.json({
            message: "User updated successfully",
            data: "Updated rows " + updateRowCount
          }));

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](2);
          res.status(500).json({
            message: 'Something goes wrong',
            data: _context5.t0
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 11]]);
}