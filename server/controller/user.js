const sendResponse =require("../helper/responseSender");
const Userservice= require("../service/user");
const crypto =require("crypto-js")
const validator =require("email-validator")
const signup = async(req,res)=>{
  try{
    let lowerCaseLetters =/[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers =/[0-9]/g;
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const  {email,name,password} = req.body;
    console.log(req.body,"dbdd")
    // return;
    if(!email||!password ||!name)
   return sendResponse(res,400,{
    sataus:false,
    message:"Please fill all details"
   })
else if(spChars.test(name) || name.match(numbers)){
    return sendResponse(res,400,{
        sataus:false,
        messaage :"name must not have special characters and numbers !"
    })
}else if(!validator.validate(email)){
        return  sendResponse(res,400,{
            status:false,
            message:"please enter correct email"
        })
    }
    else if(!password.match(upperCaseLetters)|| password.length<8){
        return  sendResponse(res,400,{
            status:false,
            message:"Password must have at least 8 characters and one uppercase!"
        })
    }
   
    let checkuser = await Userservice.findUserByMail(email);
    console.log("dfghj",checkuser)
    if(checkuser){
        return sendResponse(res,400,{
            status:false,
            message:"Email already exist",
        })
    }
    let Key = "swatikaithwas";
    let hashedPass = crypto.HmacSHA512(password,Key)
   const user = await Userservice.create({
      email:email.toLowerCase(),
      password:hashedPass,
       name:name,
   })
   if(!user)return sendResponse(res,400,{
    status:false,
    message:"somthing went wrong...."
   })
   return sendResponse(res,200,{
    status:true,
    data:user,
    message:"Singup Success"
   })
  }catch(error){
    console.log(error)
   return sendResponse(res,500,{
    satus:false,
    message:"Internal Error"
   })
  }
}

const login =async(req,res)=>{
    try{
        const {email,password} =req.body;
        if(!email||!password){
            return sendResponse(res,400,{
                status:false,
                message:" Email or Password is required!"
            })
        }
        // else if(password==""||password== undefined){
        //     return sendResponse(res,400,{
        //         status:false,
        //         message:"password is required!"
        //     })
        // }
        // let loginObj = await user
        let isExist = await Userservice.findUserByMail(email);
        if(!isExist)
        return sendResponse(res,400,{
            status:false,
            message:"Either email or password incorrect."
        })
   
    }catch(error){
        console.log(error)
       return sendResponse(res,500,{
        satus:false,
        message:"Internal Error"
       })
      }
} 
module.exports={
    signup,

}