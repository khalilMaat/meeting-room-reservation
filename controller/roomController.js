const roomModel = require("../model/roomModel");


//ADD
const createRoom = async (req,res,next) => {
    try{
        
    const {name,capacity,equipment} = req.body;

    const room = await roomModel.create({
        name,
        capacity,
        equipment
    })

    if(room){
        return res.status(201).send("Room Created Successfully");
    }

    }catch(err){
        //return res.status(500).send(err.message);
        next(err);
    }
}

//Get All
const getAllRoom = async (req,res,next)=>{
    try{
    const room = await roomModel.find();

 
    if(room.length>0){
        return res.status(200).send(room);
    }
    return res.status(404).send("Not Room Found !!");

    }catch(err){

    //return res.status(500).send(err.message);
    next(err);
}
}

//Update 
const updateRoom = async (req,res,next)=>{
    try{
    const {name,capacity,equipment} = req.body;
    const updatedRoom = await roomModel.updateOne({_id:req.params.id},{
        $set:{
            name:name,
            capacity:capacity,
            equipment:equipment, 
        }
    });

    return res.status(201).send("Updated Successfully");

    }catch(err){
        //return res.status(500).send(err.message);
        next(err);
    }

}

//Delete
const deleteRoom = async (req,res,next) => {
    try{
        const deletedRoom = await roomModel.findByIdAndDelete({_id:req.params.id});
        if(deletedRoom){
            return res.status(201).send("Room Deleted Successfully");
        }
        
        return res.status(404).send("Room Not Found !!!");
    }catch(err){
        //return res.status(500).send(err.message);
        next(err);
    }
}

//get by id
const getRoomById = async (req,res,next)=>{
    try{
    const room = await roomModel.findById(req.params.id);

    if(room){
        return res.status(200).send(room);
    }
    return res.status(404).send("Not Room Found By this ID");
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}

module.exports = {createRoom, getAllRoom, updateRoom, deleteRoom,getRoomById};