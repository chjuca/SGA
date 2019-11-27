"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCredentials = getCredentials;
exports.createCredential = createCredential;
exports.getOneCredetential = getOneCredetential;
exports.deleteCredential = deleteCredential;
exports.updateCredential = updateCredential;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _Credential = _interopRequireDefault(require("../models/Credential"));

var bcrypt = require('bcryptjs');

function getCredentials(req, res) {
  var credentials;
  return _regenerator["default"].async(function getCredentials$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _regenerator["default"].awrap(_Credential["default"].findAll());

        case 3:
          credentials = _context.sent;
          res.json({
            data: credentials
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

function createCredential(req, res) {
  var _req$body, email, password, ci, emailFound, newCredential;

  return _regenerator["default"].async(function createCredential$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, ci = _req$body.ci;
          _context2.prev = 1;
          _context2.next = 4;
          return _regenerator["default"].awrap(_Credential["default"].findOne({
            //agregar que la userid validacion
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
            message: "Ya existe la llave (email) = " + email
          }));

        case 7:
          _context2.next = 9;
          return _regenerator["default"].awrap(_Credential["default"].create({
            email: email,
            password: String(bcrypt.hashSync(password, 10)),
            userid: ci
          }, {
            fields: ['email', 'password', 'userid']
          }));

        case 9:
          newCredential = _context2.sent;

          if (!newCredential) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.json({
            message: "credentials created successfully",
            data: newCredential
          }));

        case 12:
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: 'Something goes wrong',
            data: _context2.t0
          }));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 14]]);
}

function getOneCredetential(req, res) {
  var ci, credential;
  return _regenerator["default"].async(function getOneCredetential$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ci = req.params.ci;
          _context3.prev = 1;
          _context3.next = 4;
          return _regenerator["default"].awrap(_Credential["default"].findOne({
            where: {
              userid: ci
            }
          }));

        case 4:
          credential = _context3.sent;

          if (credential) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "Credential with ci: " + ci + " does not exist."
          }));

        case 7:
          res.json({
            message: "Credential gotten successfully ",
            data: credential
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

function deleteCredential(req, res) {
  var ci, deleteRowCount;
  return _regenerator["default"].async(function deleteCredential$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ci = req.params.ci;
          _context4.prev = 1;
          _context4.next = 4;
          return _regenerator["default"].awrap(_Credential["default"].destroy({
            where: {
              userid: ci
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
          return _context4.abrupt("return", res.json({
            message: "Credential deleted successfully",
            data: "Deleted rows " + deleteRowCount
          }));

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

function updateCredential(req, res) {
  var ci, _req$body2, email, password, updateRowCount;

  return _regenerator["default"].async(function updateCredential$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          ci = req.params.ci;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; //Que el usuario pueda modificar su email ?

          _context5.prev = 2;
          _context5.next = 5;
          return _regenerator["default"].awrap(_Credential["default"].update({
            email: email,
            password: String(bcrypt.hashSync(password, 10))
          }, {
            where: {
              userid: ci
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