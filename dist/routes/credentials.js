"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _credentials = require("../controllers/credentials.controller");

var router = (0, _express.Router)(); // /api/credentials/*

router.post('/', _credentials.createCredential);
router.get('/', _credentials.getCredentials);
router.get('/:ci', _credentials.getOneCredetential);
router["delete"]('/:ci', _credentials.deleteCredential);
router.put('/:ci', _credentials.updateCredential);
var _default = router;
exports["default"] = _default;