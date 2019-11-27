"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategories = getCategories;
exports.createCategory = createCategory;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _Category = _interopRequireDefault(require("../models/Category"));

function getCategories(req, res) {
  var categories;
  return _regenerator["default"].async(function getCategories$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _regenerator["default"].awrap(_Category["default"].findAll({
            where: {
              categoryid: null
            }
          }));

        case 3:
          categories = _context.sent;
          res.json({
            data: categories
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

function createCategory(req, res) {
  var _req$body, name, description, categoryid, newCategory;

  return _regenerator["default"].async(function createCategory$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, categoryid = _req$body.categoryid;
          _context2.prev = 1;
          _context2.next = 4;
          return _regenerator["default"].awrap(_Category["default"].create({
            name: name,
            description: description,
            categoryid: categoryid
          }, {
            fields: ['name', 'description', 'categoryid']
          }));

        case 4:
          newCategory = _context2.sent;

          if (!newCategory) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.json({
            message: "Category created successfully",
            data: {
              newCategory: newCategory
            }
          }));

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Something goes wrong',
            error: _context2.t0
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
}