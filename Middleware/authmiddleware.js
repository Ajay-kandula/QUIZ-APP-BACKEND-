    const jwt=require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET;
    const authmiddleware= async(req,res,next)=>{
        const authHeader= req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(400).json({message:'Acess denied'})
        }
        const token= authHeader.split(' ')[1];
        try{
            const decoded= jwt.verify(token,JWT_SECRET)
            req.user=decoded;
            next();
        }catch(err){
            res.status(500).json({error:err.message})
        }
    }
    module.exports=authmiddleware