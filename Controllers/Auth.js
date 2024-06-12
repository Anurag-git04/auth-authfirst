const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require("jsonwebtoken");
const { options } = require('../routes/user');
require("dotenv").config();

// sign up route handler
exports.signup = async (req,res) => {
    try{
        // get data 
        const {name, email, password, role} = req.body;
        //check user already exist
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message: 'User already exist',
            });

            //secure password 
            console.log("First try")
            let hashedpassword;
            try{
                console.log("second try")
                hashedpassword = await bcrypt.hash(password, 10);
            }catch(err){
                return res.status(500).json({
                    success:false,
                    message:'Error in hashing Password'
                });
            }
        }
        // create entry  for new user
        const user = await User.create({
            name,email,password:hashpassword,role                 
        })

        return res.status(200).json({
            success:true,
            message:'User created successfully'
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            success : false,
            message: 'Error in Hashing', 
        })
    }
}

//login

exports.login = async (req,res) => {
    try{
        //data fetch
        const {email,password} = req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message:'please fill all the details carefully',
            })
        }

        //check for registered user
        const user = await user.findOne({email})
        // if not a register user
        if(!user){
            return res.status(401).json({
                success:false,
                message:'user id not register',
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }
        //verify password & generate JWT Token
        if(await bcrypt.compare(password,user.password)){
            //password match
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                })
            // user.token = token;
            // user.password = undefined;  
            const option ={
                expires: new Date( Date.now() + 3* 24*60*60*1000),
                httpOnly:true
            }

            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message:"user logged in succesfully"
            })
        }
        else{
            //password do not match
            return res.status(403).json({
                success:false,
                message:'password do not match',
            })
        }
    }
    catch(err){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'login failure',
        })
    }
}

//56