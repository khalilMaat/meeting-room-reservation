//import
const express = require("express");
const roomRouter = express.Router();
const roomController = require("../controller/roomController");
const checkAuth = require("../middleware/authMiddleware");


roomRouter.post("/create",checkAuth ,roomController.createRoom);
roomRouter.get("/all" ,checkAuth, roomController.getAllRoom);


module.exports = roomRouter;