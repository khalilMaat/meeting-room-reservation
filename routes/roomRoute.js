//import
const express = require("express");
const roomRouter = express.Router();
const roomController = require("../controller/roomController");
const checkAuth = require("../middleware/authMiddleware");


roomRouter.post("/create",checkAuth ,roomController.createRoom);
roomRouter.get("/all" ,checkAuth, roomController.getAllRoom);
roomRouter.put("/:id",checkAuth, roomController.updateRoom);
roomRouter.delete("/:id",checkAuth, roomController.deleteRoom);
roomRouter.get("/:id",checkAuth,roomController.getRoomById);


module.exports = roomRouter;