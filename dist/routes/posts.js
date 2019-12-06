"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _post = require("../controllers/post.controller");

var _authentication = require("../middleware/authentication");

var router = (0, _express.Router)();
router.post('/', [_authentication.checkToken, _authentication.checkRole], _post.createPost);
router.get('/', _post.getPosts);
router.put('/:id', _post.updatePost);
router["delete"]('/:id', _post.deletePost);
var _default = router;
exports["default"] = _default;