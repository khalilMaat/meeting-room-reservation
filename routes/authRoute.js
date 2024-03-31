const express = require("express");
const { register, login, logout } = require("../controller/authController");
const authRouter = express.Router();
const {checkAuth, authorizeAdmin, authorizeUser} = require("../middleware/authMiddleware");

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",checkAuth,logout);

module.exports = authRouter;