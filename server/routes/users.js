var express = require('express');
var router = express.Router();
const AuthController =require("../controller/user");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/signup",AuthController.signup);

module.exports = router;
