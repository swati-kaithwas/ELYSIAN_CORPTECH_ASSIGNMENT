const sendResponse = require("../helper/responseSender");
const Todoservice = require("../service/todo");
const createTodo = async (req, res) => {
  /*
    1. create todo
    2. title ,description is required
    */
  try {
    let { title, description } = req.body;
    if (!title || !description)
      return sendResponse(res, 400, {
        status: false,
        message: "title and description is required!",
      });
    const obj = {
      title: title,
      description: description,
    };
    const createtodo = await Todoservice.createtodo(obj);
    if (!createtodo)
      return sendResponse(res, 400, {
        status: false,
        message: "Todo does not create!",
      });
    return sendResponse(res, 200, {
      status: true,
      data: createtodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};
const getAllTodo = async (req, res) => {
  /*
    1. get all todo
    */

  try {
    const data = await Todoservice.findAll(req.query);
    if (!data)
      return sendResponse(res, 400, {
        status: false,
        message: "not found todo",
      });
    return sendResponse(res, 200, {
      status: true,
      data: data,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};
const UpadteTodo = async (req, res) => {
  try {
    /*
        1. id is required
        2. upadte todo title,description
        */
    let id = req.params.id;
    let { title, description } = req.body;
    if (!id)
      return sendResponse(res, 400, {
        status: false,
        message: " Id is required !",
      });
    let obj = {
      title,
      description,
    };
    let content = await Todoservice.updateTodo(id, obj);
    console.log("content", content);
    if (!content)
      return sendResponse(400, res, {
        status: false,
        message: "todo not update !",
      });
    return res.send({
      status: true,
      data: content,
      message: "sucessfully update todo!",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};
const getTodoById = async (req, res) => {
  /*
    1.id is required
    2. using id find todo
    */
  try {
    const { id } = req.body;
    if (!id)
      return sendResponse(res, 400, {
        status: false,
        message: "id is required !",
      });

    const data = await Todoservice.GetById(id);
    if (!data)
      return sendResponse(res, 400, {
        status: false,
        message: "data not found",
      });
    return sendResponse(res, 200, {
      status: true,
      data: data,
      message: "successfully",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};
const deleteTodo = async (req, res) => {
  /*
    1. delete by id
    2. id is required
    */
  try {
    const id = req.params.id;
    console.log("id", id);
    //    console.log("idff",req)
    if (!id)
      return sendResponse(res, 400, {
        status: false,
        message: "id is required !",
      });

    const data = await Todoservice.removedata(id);
    console.log("data", data);
    if (!data)
      return sendResponse(res, 400, {
        status: false,
        message: "data not found",
      });
    return sendResponse(res, 200, {
      status: true,

      message: "successfully deleted !",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};
module.exports = {
  createTodo,
  getAllTodo,
  UpadteTodo,
  getTodoById,
  deleteTodo,
};
