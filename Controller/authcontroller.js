const User=require('../Model/user')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const register= async(req,res)=>{
    const{name,email,password}=req.body
    try{
        const userexist= await User.findOne({email})
        if(userexist) return res.status(400).json({message:"user already exissts"});
        const hashedpassowrd=  await bcrypt.hash(password,10)
        const user= await User.create({name,email,password:hashedpassowrd})
        return res.status(200).json({message:'user registerd Sucessfully'})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
const login=async (req,res)=>{
    const{email,password}=req.body;
    try{
        const user= await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid details"});
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid passowrd'});
        const token= jwt.sign({userId:user._id}, process.env.JWT_SECRET,{
            expiresIn:'2h'
        })
        res.status(200).json({token,
            user:{
                id:user._id,
                email:user.email,
                password:user.password
            }})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports={register,login}