

//auth , isStudent , isAdmin

const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req,res, next)=>{
    try{
        //extract jwt token
        // pending other way to fetch token

        console.log("cookies",req.cookies.token);
        console.log("body",req.body.token)

        const token = req.body.token ;
        // || req.cookie.token || token.header("Authorization").replace("Bearer",""){safest}

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload);
            //why this 
            req.user = payload;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            })
        }
        next();

    }catch(error){
        res.status(401).json({
            success:false,
            message:"Something went wrong, while verifying the token"
        })
    }
}

exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This route is protected for student"
            })
        }
        next();
    }catch(error){
        res.status(500).json({
            success:false,
            message:" user Role cannot be matchibng"
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This route is protected for Admin"
            })
        }
        next();
    }catch(error){
        res.status(500).json({
            success:false,
            message:" user Role cannot be matchibng"
        })
    }
}

