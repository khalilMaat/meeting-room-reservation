const roomModel = require("../model/roomModel");


//ADD
const createRoom = async (req,res) => {
    try{
    const {name,capacity,equipment} = req.body;

    const room = await roomModel.create({
        name,
        capacity,
        equipment,
    })

    if(room){
        return res.status(201).send("Room Created Successfully");
    }

    }catch(err){
        return res.status(406).send(err.message);
    }
}

//Get All
const getAllRoom = async (req,res)=>{
    try{
    const room = await roomModel.findOne();

 
    if(room){
        return res.status(200).send(room);
    }

    }catch(err){

    return res.status(404).send(err.message);
}
}

module.exports = {createRoom, getAllRoom};