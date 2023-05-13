const {Schema,model} = require("mongoose");

const todo= new Schema({
    title:{
        type:String,
        required:[true,'title is not required!'],
    },
    description:{
        type:String,
      
        required:[true,'descriptio is not required!'],
    },
    
},
     {timestamps: true}
)
const ToDo = model("todo",todo);
module.exports =ToDo;