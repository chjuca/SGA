"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _login = require("../controllers/login.controller");

var router = (0, _express.Router)();
router.post('/', _login.login);
var _default = router;
exports["default"] = _default;