"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _authentication = require("../middleware/authentication");

var router = (0, _express.Router)(); // /api/users/*

router.post('/', _authentication.checkToken, _user.createUser);
router.get('/', _authentication.checkToken, _user.getUsers);
router.get('/:ci', _authentication.checkToken, _user.getOneUser);
router["delete"]('/:ci', _authentication.checkToken, _user.deleteUser);
router.put('/:ci', [_authentication.checkToken, _authentication.checkRole], _user.updateUser);
var _default = router;
exports["default"] = _default;