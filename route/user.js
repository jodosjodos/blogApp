import express from "express"
export const userRouter=express.Router()

// imort controllers
import { loginUser,signUpUser } from "../controllers/userController.js"
import { resetPasswordLink,validateId,updateUserPassword } from "../middlwares/sendResetLink.js"

// middlware
import { sendMail } from "../middlwares/mailer.js"
import { authGuard } from "../middlwares/auth.js"
import { updateProfile, updateProfilePicture, userProfile } from "../controllers/userController2.js"

// login route 
userRouter.post("/login",loginUser)
userRouter.post("/signUp",sendMail,signUpUser)
userRouter.post("/sendPasswordLink",resetPasswordLink)
userRouter.get("/validate/",validateId)
userRouter.put("/updateUser/",updateUserPassword)


// new ones

// get user data in fronted so that u can udpate him
userRouter.get("/profile",authGuard,userProfile)

// update user credentials
userRouter.put("/updateProfile",authGuard,updateProfile)
userRouter.put("/updateProfilePicture",authGuard,updateProfilePicture)
