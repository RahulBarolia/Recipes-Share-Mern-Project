import express from "express";
import {
  login,
  signUp,
  getUserProfile,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { inputValidate } from "../middlewares/validateInput.js";

const route = express.Router();

route.post("/signup", inputValidate, signUp);
route.post("/login", login);
route.get("/profile", authMiddleware, getUserProfile);
export default route;
