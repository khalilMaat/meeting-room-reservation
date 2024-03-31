const express = require("express");
const userModel = require("../model/userModel");
const blacklistTokenModel = require("../model/blacklistTokenModel");
const {hashPassword, verifyPassword, generateToken} = require("../tools/authTools");
const jwt = require("jsonwebtoken");

const register = async (req,res,next)=>{
    try{
        
        const {fullname,email,password} = req.body;
        const user = await userModel.create({
            fullname,
            email,
            password: hashPassword(password)
        });

        if(user){
            return res.status(201).send("User Register Successfully");
        }

        return res.status(406).send("Something Worng !!");
    }catch(err){
        next(err);
    }
}
//async with await is a promise to get data from database
// without await we can't get data

const login =  async (req,res,next)=>{
    try{
        const {fullname,email,password} = req.body;
        
        const user =  await userModel.findOne({email:email});
        
        if(!user || !verifyPassword(password,user.password)){
            return res.status(404).send("Email or password is invalid !!");
        }

        const token = generateToken({email});
        const {password: pass,role, ...other} = user._doc;

        res.status(200).send({
            message: "successfully logged in",
            other,
            token
        });

    }catch(err){
        next(err);
    }

}

const logout = async (req,res,next)=>{

    try{
    const token = req.headers['authorization'].split(' ')[1];
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); 
    
    const blacklistToken =  await blacklistTokenModel.create({
        token,
        expiration
    });

    return res.send('Logged out successfully.');
}catch(err){
    next(err);
}
}

module.exports = {
    register,
    login,
    logout
}