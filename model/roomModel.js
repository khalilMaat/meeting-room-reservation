//import
const { Schema, model } = require('mongoose');


const roomSchema = new Schema(
  {
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  equipment: {
    type: [String],
    required: true
  },
  availability: {
    type: [{
      startTime: Date,
      endTime: Date
    }],
    default: [],
  },
  },
  { timestamps: true }, //display the created and updated date 

);

const roomModel = model("Room", roomSchema);
module.exports = roomModel;
