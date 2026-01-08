const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.auth = async(req,res,next)=>{
    try{
        // extract jwt token
        const token = req.body.token || req.cookie.token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }
        // verrify the token 
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)

            req.user = decode;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            })
        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Something is wrong to verify the token"
        })
    }
}

exports.isStudent = async(req,res,next) =>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role can not be verify"
        })
    }
}


exports.isAdmin = async(req,res,next) =>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role can not be verify"
        })
    }
}