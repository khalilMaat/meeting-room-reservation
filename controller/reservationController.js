const reservationModel = require("../model/reservationModel");

//add
const createReservation = async (req,res)=> {
    try{
    const {userId,roomId,startTime,endTime} = req.body;
    const reservation = await reservationModel.create({
        userId,
        roomId,
        startTime,
        endTime
    });

    if(reservation){
        return res.status(201).send("Reservation Created Successfully");
    }


    }catch(err){
        return res.status(500).send(err.message);
    }

}

//get all
const getAllReservation = async (req,res)=>{
    try{
    const reservations = await reservationModel.findOne();

    if(reservations){
        return res.status(200).send(reservations);
    }

    return res.status(404).send("reservation Not Found");

    }catch(err){
        return res.status(500).send(err.message);
    }

}

//udpate 
const updateReservation = async (req,res)=>{
    try{
    const updatedRes = await reservationModel.updateOne({_id:req.params.id},{
        $set:{
            userId: req.body.userId,
            roomId: req.body.roomId,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        }
    });

    if(updatedRes){
        return res.status(200).send("Reservation updated Successfully");
    }
}catch(err){
    return res.status(500).send(err.message);
}
}


//delete
const deleteReservation = async (req,res)=>{
    try{
    const deleteRes = await reservationModel.findByIdAndDelete({_id:req.params.id});

    if(deleteRes){
        return res.status(200).send("Reservation Deleted Successfully");
    }

    return res.status(404).send("Reservation Not Found !!!");
}catch(err){
    return res.satuts(500).send(err.message);
}
}


module.exports = {createReservation,getAllReservation,updateReservation,deleteReservation};