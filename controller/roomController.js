const roomModel = require("../model/roomModel");


//ADD
const createRoom = async (req,res) => {
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
        return res.status(500).send(err.message);
    }
}

//Get All
const getAllRoom = async (req,res)=>{
    try{
    const room = await roomModel.findOne();

 
    if(room){
        return res.status(200).send(room);
    }
    return res.status(404).send("Not Room Found !!");

    }catch(err){

    return res.status(500).send(err.message);
}
}

//Update 
const updateRoom = async (req,res)=>{
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
        return res.status(500).send(err.message);
    }

}

//Delete
const deleteRoom = async (req,res) => {
    try{
        const deletedRoom = await roomModel.findByIdAndDelete({_id:req.params.id});
        if(deletedRoom){
            return res.status(201).send("Room Deleted Successfully");
        }
        
        return res.status(404).send("Room Not Found !!!");
    }catch(err){
        return res.status(500).send(err.message);
    }
}

//get by id
const getRoomById = async (req,res)=>{
    try{
    const room = await roomModel.findById(req.params.id);

    if(room){
        return res.status(200).send(room);
    }
    return res.status(404).send("Not Room Found By this ID");
}catch(err){
    return res.status(500).send(err.message);
}
}

module.exports = {createRoom, getAllRoom, updateRoom, deleteRoom,getRoomById};