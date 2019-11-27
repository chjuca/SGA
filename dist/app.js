"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routes/users"));

var _credentials = _interopRequireDefault(require("./routes/credentials"));

var _login = _interopRequireDefault(require("./routes/login"));

var _category = _interopRequireDefault(require("./routes/category"));

//Importando Routes
//initializations
var app = (0, _express["default"])(); //middlewares

app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json()); //Routes

app.use('/api/users', _users["default"]);
app.use('/api/credentials', _credentials["default"]);
app.use('/api/category', _category["default"]); //Routes *** LOGIN ***

app.use('/api/login', _login["default"]);
var _default = app;
exports["default"] = _default;