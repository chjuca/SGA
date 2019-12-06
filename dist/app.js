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

var _posts = _interopRequireDefault(require("./routes/posts"));

var _assets = _interopRequireDefault(require("./routes/assets"));

var multer = require('multer');

var path = require('path');

//initializations
var app = (0, _express["default"])(); //middlewares

app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
var storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({
  storage: storage
}).single('image')); //Routes

app.use('/api/users', _users["default"]);
app.use('/api/credentials', _credentials["default"]);
app.use('/api/category', _category["default"]);
app.use('/api/post', _posts["default"]);
app.use('/api/assent', _assets["default"]); //Routes *** LOGIN ***

app.use('/api/login', _login["default"]);
var _default = app;
exports["default"] = _default;