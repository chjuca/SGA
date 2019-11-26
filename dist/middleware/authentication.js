"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRole = exports.checkToken = void 0;

require('../config/config');

var jwt = require('jsonwebtoken'); //==============
//  Check Token
//==============


var checkToken = function checkToken(req, res, next) {
  var auth = req.get('authorization');
  jwt.verify(auth, process.env.SEED, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
        err: "Corrupted token"
      });
    }

    req.user = decoded.data;
    next();
  });
}; //==============
//  Check ROLE
//==============


exports.checkToken = checkToken;

var checkRole = function checkRole(req, res, next) {
  var user = req.user;
  console.log(user);

  if (user.role === 4) {
    // cambiar la llave
    next();
  } else {
    return res.status(400).json({
      ok: false,
      message: "The user is not an administrator"
    });
  }
}; //==============
//  Validate ROLE
//==============
// export let validateRole = (req, res, next)=>{
//     const {category} = req.body;
//     if(category === 'Role' || category === 'Keywords'){
//         next();
//     }else{
//         return res.status(400).json({
//             ok: false,
//             message: "That category does not exist"
//         })
//     }
// };


exports.checkRole = checkRole;