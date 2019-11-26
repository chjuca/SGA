"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _category = require("../controllers/category.controller");

var router = (0, _express.Router)();
router.get('/', _category.getCategories);
router.post('/', _category.createCategory);
var _default = router;
exports["default"] = _default;