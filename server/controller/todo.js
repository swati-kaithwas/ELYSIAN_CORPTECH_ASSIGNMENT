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
        const data= await Todoservice.findAll(req.query);
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
    let {id,title,description} = req.body;
    if(!id) return sendResponse(res,400,{
        status:false,
        message:" Id is required !"
    })
   let obj={
    id,
    title,
    description,

   }
   let content = await Todoservice.updateTodo(id,obj);
   console.log("content",content);
   if(!content) return sendResponse(400,res,{
    status:false,
    message:"profile not update !"
   })
    return sendResponse(200,res,{
    status:true,
    data:content,
    message:"sucessfully update profile!"
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
const getTodoById = async(req,res)=>{
    try{
       const {id} = req.body;
        if(!id) return sendResponse(res,400,{
            status:false,
            message:"id is required !"
        })

 const  data = await Todoservice.GetById(id);
 if(!data) return sendResponse(res,400,{
    status:false,
    message:"data not found"
 })
 return sendResponse(res,200,{
    status:true,
    data:data,
    message:"successfully"
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
const deleteTodo = async(req,res)=>{
    try{
       const {id} = req.body;
        if(!id) return sendResponse(res,400,{
            status:false,
            message:"id is required !"
        })

 const  data = await Todoservice.removedata(id);
 if(!data) return sendResponse(res,400,{
    status:false,
    message:"data not found"
 })
 return sendResponse(res,200,{
    status:true,
   
    message:"successfully deleted !"
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
module.exports={
    createTodo,
    getAllTodo,
    UpadteTodo,
    getTodoById,
    deleteTodo,
}