const reservationModel = require("../model/reservationModel");

//add
const createReservation = async (req,res,next)=> {
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
        //return res.status(500).send(err.message);
        next(err);
    }

}

//get all
const getAllReservation = async (req,res,next)=>{
    try{
    const reservations = await reservationModel.find();

    if(reservations.length >0){
        return res.status(200).send(reservations);
    }

    return res.status(404).send("reservation Not Found");

    }catch(err){
        //return res.status(500).send(err.message);
        next(err);
    }

}

//udpate 
const updateReservation = async (req,res,next)=>{
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
    //return res.status(500).send(err.message);
    next(err);
}
}


//delete
const deleteReservation = async (req,res,next)=>{
    try{
    const deleteRes = await reservationModel.findByIdAndDelete({_id:req.params.id});

    if(deleteRes){
        return res.status(200).send("Reservation Deleted Successfully");
    }

    return res.status(404).send("Reservation Not Found !!!");
}catch(err){
    //return res.satuts(500).send(err.message);
    next(err);
}
}


//get by id
const getReservationById = async (req,res,next)=>{
    try{
    const reservation = await reservationModel.findById(req.params.id);

    if(reservation){
        return res.status(200).send(reservation);
    }
    return res.status(404).send("Not Reservation Found By this ID");
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}



module.exports = {createReservation,getAllReservation,updateReservation,deleteReservation,getReservationById};