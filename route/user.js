import express from "express"
export const userRouter=express.Router()

// imort controllers
import { loginUser,signUpUser } from "../controllers/userController.js"
import { resetPasswordLink,validateId,updateUserPassword } from "../middlwares/sendResetLink.js"

// middlware
import { sendMail } from "../middlwares/mailer.js"

// login route 
userRouter.post("/login",loginUser)
userRouter.post("/signUp",sendMail,signUpUser)
userRouter.post("/sendPasswordLink",resetPasswordLink)
userRouter.get("/validate/",validateId)
userRouter.put("/updateUser/",updateUserPassword)
