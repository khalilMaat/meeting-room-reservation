const {Schema, model} = require("mongoose");

const reservationSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User', required: true},
    roomId:{ type: Schema.Types.ObjectId, ref: 'Room', required: true},
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    }

});
const reservationModel = model('Reservation',reservationSchema);
module.exports = reservationModel;
