var express = require('express');
var router = express.Router();
const TodoController =require("../controller/todo");
/* GET users listing. */
router.use((req, res, next) => {
    console.log("TEST ROUTE: "+req.originalUrl + "::" + new Date().toISOString());
    next();
  });
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/createtodo",TodoController.createTodo)

router.get("/getalltodo",TodoController.getAllTodo);
router.put("/updatetodo",TodoController.UpadteTodo)
module.exports = router;