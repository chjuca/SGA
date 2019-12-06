"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAssent = createAssent;
exports.getAssents = getAssents;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _Assets = _interopRequireDefault(require("../models/Assets"));

var cloudinary = require('cloudinary');

var fs = require('fs-extra');

cloudinary.config({
  cloud_name: 'sga-api',
  api_key: '521151622485177',
  api_secret: 'ebQ4wUgyTXsKc3Aqkbvt0Hz2hu8'
});

function createAssent(req, res) {
  var categoryid, result, uploadedImage;
  return _regenerator["default"].async(function createAssent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          categoryid = req.body.categoryid;
          _context.prev = 1;
          _context.next = 4;
          return _regenerator["default"].awrap(cloudinary.v2.uploader.upload(req.file.path));

        case 4:
          result = _context.sent;
          _context.next = 7;
          return _regenerator["default"].awrap(_Assets["default"].create({
            imageurl: result.url,
            publicid: result.public_id,
            categoryid: categoryid
          }, {
            fields: ['imageurl', 'publicid', 'categoryid']
          }));

        case 7:
          uploadedImage = _context.sent;
          _context.next = 10;
          return _regenerator["default"].awrap(fs.unlink(req.file.path));

        case 10:
          if (!uploadedImage) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.json({
            message: "Image uploaded successfully",
            data: uploadedImage
          }));

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Something goes wrong',
            error: _context.t0
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 14]]);
}

function getAssents(req, res) {
  var assents;
  return _regenerator["default"].async(function getAssents$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _regenerator["default"].awrap(_Assets["default"].findAll());

        case 3:
          assents = _context2.sent;
          res.json({
            data: assents
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Something goes wrong",
            error: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}