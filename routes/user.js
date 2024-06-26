const express = require("express")
const router = express.Router();

const {login,signup} = require("../Controllers/Auth");
const {auth, isStudent, isAdmin} = require('../middleware/auth')

router.post("/login", login);
router.post("/signup", signup);

// testing Route
router.get("/test", auth, (req,res)= ()=>{
    res.json({
        success:true,
        message:"Welcome to the Protected route for Tests",
    });
})
// protected Route
router.get("/student",auth, isStudent, (req,res)= ()=>{
    res.json({
        success:true,
        message:"Welcome to the Protected route for student",
    });
});
router.get("/admin",auth, isAdmin,(req,res)= ()=>{
    res.json({
        success:true,
        message:"Welcome to the Protected route for Admin",
    }); 
});


module.exports = router;