const express=require("express");
const router=express.Router();
const userModel=require("../models/user.models")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const { body,validationResult } = require('express-validator');

/* /user/test */


router.get("/test",(req,res)=>{
    res.send("Hello from test");
})


router.get("/register",(req,res)=>{
    res.render("register");
})

router.post("/register",
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:5}),
    async (req,res)=>{
    const errors=validationResult(req);
    console.log(errors);
    if(!errors.isEmpty())
    {
        res.send("Invalid Data");
    }
    else
    {
        const {username ,email ,password}=req.body;
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=await userModel.create({
            username,
            email,
            password:hashPassword
        })
        res.redirect("/user/login");
    }
    
})

router.get("/login",(req,res)=>{
    res.render("login.ejs");
})

router.post("/login",
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:5}),
    async (req,res)=>
    {
        const errors=validationResult(req);
        console.log(errors);
        if(!errors.isEmpty())
        {
            res.send("Invalid Data");
        }
        else
        {
            const{username,password}=req.body;
            const user=await userModel.findOne({
                username:username
            });
            if(!user){
                return res.send("Username or password is incorrect"); 
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.send("Username or password is incorrect");
            }
            const token=jwt.sign({
                id:user._id,
                email:user.email,
                username:user.username},
                process.env.JWT_SECRET
                );
                res.cookie("token",token);  //add token to cookie  name,value
             res.redirect("/");
        }
    })

module.exports=router;
