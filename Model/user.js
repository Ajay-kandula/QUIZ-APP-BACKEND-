const mongoose=require('mongoose')
const user=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true}

},{timestamps:true});
module.exports=mongoose.model('User',user)