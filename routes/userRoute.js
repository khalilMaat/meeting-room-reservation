//import
const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const {checkAuth, authorizeAdmin, authorizeUser} = require("../middleware/authMiddleware");


userRouter.post("/create",checkAuth ,userController.createUser);
userRouter.get("/me",checkAuth,userController.getMe);
userRouter.get("/all" , checkAuth ,authorizeAdmin,userController.getAllUser);
userRouter.put("/:id",checkAuth, userController.updateUser);
userRouter.delete("/:id",checkAuth, userController.deleteUser);
userRouter.get("/:id",checkAuth,userController.getUserById);



module.exports = userRouter;