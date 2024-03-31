const userModel = require("../model/userModel");
const { hashPassword }  = require("../tools/authTools");
//add
const createUser = async (req,res,next)=> {
    try{
    const {fullname,email,password} = req.body;
    const user = await userModel.create({
        fullname,
        email,
        password
    });

    if(user){
        return res.status(201).send("user Created Successfully");
    }


    }catch(err){
        //return res.status(500).send(err.message);
        next(err);
    }

}

//get all
const getAllUser = async (req,res,next)=>{
    try{
    const users = await userModel.find().select('-password');

    
    if(users.length >0){
        return res.status(200).send(users);
    }

    return res.status(404).send("user Not Found");

    }catch(err){
        next(err);
    }

}

//udpate 
const updateUser = async (req,res,next)=>{
    try{
    const updatedUser = await userModel.updateOne({_id:req.params.id},{
        $set:{
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashPassword(req.body.password)
        }
    });

    if(updatedUser){
        return res.status(200).send("user updated Successfully");
    }
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


//delete
const deleteUser = async (req,res,next)=>{
    try{
    const deleteUser = await userModel.findByIdAndDelete({_id:req.params.id});

    if(deleteUser){
        return res.status(200).send("user Deleted Successfully");
    }

    return res.status(404).send("user Not Found !!!");
}catch(err){
    //return res.satuts(500).send(err.message);
    next(err);
}
}


//get by id
const getUserById = async (req,res,next)=>{
    try{
    const user = await userModel.findById(req.params.id).select('-password');

    if(user){
        return res.status(200).send(user);
    }
    return res.status(404).send("Not user Found By this ID");
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}

const getMe = async (req,res,next)=>{
    try{
        const {_id,fullname,email} = await userModel.findOne({email:req.user.email});
        return res.status(200).send({
            id:_id,
            fullname,
            email
        });
}catch(err){
    next(err);
}
}



module.exports = {createUser,getAllUser,updateUser,deleteUser,getUserById,getMe};