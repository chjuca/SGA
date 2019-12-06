"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _assets = require("../controllers/assets.controller");

var router = (0, _express.Router)();
router.post('/', _assets.createAssent);
router.get('/', _assets.getAssents);
var _default = router;
exports["default"] = _default;