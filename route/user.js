import express from "express"
export const userRouter=express.Router()

// imort controllers
import { loginUser,signUpUser } from "../controllers/userController.js"

// login route 
userRouter.post("/login",loginUser)
userRouter.post("/signUp",signUpUser)