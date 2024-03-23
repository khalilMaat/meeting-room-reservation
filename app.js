//import
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const roomRouter = require("./routes/roomRoute");
const authRouter = require("./routes/authRoute");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;


//Room Route:
app.use(express.json());
app.use("/room", roomRouter);
app.use("/auth",authRouter);

//Connect To DB and Start Server
mongoose.connect(MONGODB_URI+DATABASE_NAME).then(() => {
  try {
    console.log(`Connected To ${DATABASE_NAME}`);
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Catch ERROR: "+err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome To Home Page");
});
