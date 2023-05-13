const ToDo = require("../model/todo");
 const createtodo = async(obj)=>{
    try{
        let data = new ToDo(obj);
        await data. save();
        return data;


    }catch(error){
        console.log(error);
        return false
    }
 }
 const findAll = async()=>{
    try{

    return await ToDo.find({})
    }
    catch(error){
        console.log(error);
        return false;
    }
 }
 module.exports ={
 createtodo,
 findAll,

 }