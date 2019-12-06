"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.getPosts = getPosts;
exports.updatePost = updatePost;
exports.deletePost = deletePost;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _Post = _interopRequireDefault(require("../models/Post"));

function createPost(req, res) {
  var _req$body, description, html, title, categoryid, user, newPost;

  return _regenerator["default"].async(function createPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, description = _req$body.description, html = _req$body.html, title = _req$body.title, categoryid = _req$body.categoryid;
          user = req.user;
          _context.prev = 2;
          _context.next = 5;
          return _regenerator["default"].awrap(_Post["default"].create({
            description: description,
            autorid: user.ci,
            html: html,
            title: title,
            categoryid: categoryid
          }, {
            fields: ['description', 'autorid', 'html', 'title', 'categoryid']
          }));

        case 5:
          newPost = _context.sent;

          if (!newPost) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.json({
            message: "Post created successfully",
            data: newPost
          }));

        case 8:
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Something goes wrong',
            error: _context.t0
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 10]]);
}

function getPosts(req, res) {
  var posts;
  return _regenerator["default"].async(function getPosts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _regenerator["default"].awrap(_Post["default"].findAll());

        case 3:
          posts = _context2.sent;
          res.json({
            data: posts
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

function updatePost(req, res) {
  var id, _req$body2, description, html, title, categoryid, updateRowCount;

  return _regenerator["default"].async(function updatePost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, description = _req$body2.description, html = _req$body2.html, title = _req$body2.title, categoryid = _req$body2.categoryid;
          _context3.prev = 2;
          _context3.next = 5;
          return _regenerator["default"].awrap(_Post["default"].update({
            description: description,
            html: html,
            title: title,
            categoryid: categoryid
          }, {
            where: {
              id: id
            }
          }));

        case 5:
          updateRowCount = _context3.sent;

          if (!(updateRowCount == 0)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "Can't be updated because this post does not exist",
            data: "Updated rows " + updateRowCount
          }));

        case 8:
          return _context3.abrupt("return", res.json({
            message: "Post updated successfully",
            data: "Updated rows " + updateRowCount
          }));

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          res.status(500).json({
            message: 'Something goes wrong',
            data: _context3.t0
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 11]]);
}

function deletePost(req, res) {
  var id, deleteRowCount;
  return _regenerator["default"].async(function deletePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return _regenerator["default"].awrap(_Post["default"].destroy({
            where: {
              id: id
            }
          }));

        case 4:
          deleteRowCount = _context4.sent;

          if (!(deleteRowCount === 0)) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: "Can't be deleted because this post does not exist",
            data: "Deleted rows " + deleteRowCount
          }));

        case 7:
          return _context4.abrupt("return", res.json({
            message: "Post deleted successfully",
            data: "Deleted rows " + deleteRowCount
          }));

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json({
            message: "Something goes wrong",
            error: _context4.t0
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
}