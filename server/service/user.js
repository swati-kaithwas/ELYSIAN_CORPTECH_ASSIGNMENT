const User = require("../model/user");


const findUserByMail = async(email)=>{
    try{
    const data = await User.findOne({email:email});
    return data;
    }
    catch(error){
        console.log(error);
        return false;
    }
}
const create =async(data)=>{
    try{
        let user = new User(data);
        await user.save();
        return user;

    }catch(error){
        console.log(error);
        return false;
    }
}
module.exports={
    findUserByMail,
    create,
}