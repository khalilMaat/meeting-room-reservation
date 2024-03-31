//import
const express = require("express");
const reservationRouter = express.Router();
const {checkAuth, authorizeAdmin, authorizeUser} = require("../middleware/authMiddleware");
const reservationController = require("../controller/reservationController");

//Route
reservationRouter.post("/create",checkAuth,reservationController.createReservation);
reservationRouter.get("/all",checkAuth,reservationController.getAllReservation);
reservationRouter.put("/:id",checkAuth,reservationController.updateReservation);
reservationRouter.delete("/:id",checkAuth,reservationController.deleteReservation);
reservationRouter.get("/:id",checkAuth,reservationController.getReservationById);

module.exports = reservationRouter;