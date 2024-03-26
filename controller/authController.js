const express = require("express");
const userModel = require("../model/userModel");
const {hashPassword, verifyPassword, generateToken} = require("../tools/authTools");
const jwt = require("jsonwebtoken");

const register = async (req,res)=>{
    try{
        
        const {fullname,email,password} = req.body;
        const user = await userModel.create({
            fullname,
            email,
            password: hashPassword(password)
        });

        if(user){
            res.status(201).send("User Register Successfully");
        }

        return res.status(406).send("Something Worng !!");
    }catch(err){
        res.status(500).send(err.message);
    }
}
//async with await is a promise to get data from database
// without await we can't get data

const login =  async (req,res)=>{
    try{
        const {fullname,email,password} = req.body;
        const user =  await userModel.findOne({email:email});
      
        if(!user || !verifyPassword(password,user.password)){
            return res.status(404).send("Email or password is invalid !!");
        }

        const token = generateToken({fullname,email,password});
        return res.status(200).send({
            message: "successfully logged in",
            token: token
        });

    }catch(err){
        return res.status(500).send(err.message);
    }

}

module.exports = {
    register,
    login
}