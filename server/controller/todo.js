const sendResponse =require("../helper/responseSender");
const Todoservice=require("../service/todo")
const createTodo =async(req,res)=>{
    try{
        let {title,description}= req.body
        if(!title||!description)
        return sendResponse(res,400,{

            status:false,
            message:"title and description is required!"
        })
        const obj={
         title:title,
         description:description,
        }
      const createtodo = await Todoservice.createtodo(obj)
      if(!createtodo)
      return sendResponse(res,400,{
        status:false,
        message:"Todo does not create!"
      })
      return sendResponse(res,200,{
        status:true,
        data:createtodo,
        message:"Todo created successfully"
      })

    }
    catch(error){
   console.log(error);
   return sendResponse(res,500,{
    status:false,
    message:"Internal Error!"
   })
    }
}
const getAllTodo = async(req,res)=>{
    try{
        const data= await Todoservice.findAll();
        if(!data)
        return sendResponse(res,400,{
            status:false,
            message:"not found todo"
        })
     return sendResponse(res,200,{
        status:true,
        data:data,
        message:"success"
     })
    }
    catch(error){
        console.log(error);
        return sendResponse(res,500,{
         status:false,
         message:"Internal Error!"
        })
    }
}
const UpadteTodo = async(req,res)=>{
    try{


    }

    catch(error){
        console.log(error);
        return sendResponse(res,500,{
         status:false,
         message:"Internal Error!"
        })
    }
}
const getTodoById= async(req,res)=>{
    try{


    }

    catch(error){
        console.log(error);
        return sendResponse(res,500,{
         status:false,
         message:"Internal Error!"
        })
    }
}
module.exports={
    createTodo,
    getAllTodo,
    UpadteTodo,
    getTodoById,

}