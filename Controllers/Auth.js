const bcrypt = require('bcrypt');
const user = require('../models/User')

// sign up route handler
exports.signup = async (req,res) => {
    try{
        // get data 
        const {name, email, password, role} = req.body;
        //check user already exist
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: 'User already exist',
                success : false
            });

            //secure password 
            let hashedpassword;
            try{
                hashedpassword = await bcrypt.hash(password,10); 
            }catch(error){
                return res.status(500).json({
                    success:false,
                    message:'Error in hashing Password'
                })
            }
        }
        // create entry  for new user
        const user = await user.create({
            name,email,password:hashpassword,role                 
        })

        return res.status(200).json({
            success:true,
            message:'User created successfully'
        })
    }
    catch(error){
        console.error(first)
        res.status(500).json({
            success : false,
            message: 'Error in Hashing', 
        })
    }
}

