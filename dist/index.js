"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('./config/config');

function main() {
  _app["default"].listen(process.env.PORT);

  console.log('Server on port:', process.env.PORT);
}

;
main();