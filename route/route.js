import { Router } from "express";
export const router=Router()


// middlwares
import { verifyUser } from "../middlwares/verifyUsername.js";
import { Auth,localVariables } from "../middlwares/auth.js";


// all controllers
import * as controller from "../controllers/appController.js"
import { registerMail } from "../controllers/mailer.js";

router.route("/register").post(controller.register)
router.route("/registerMail").post(registerMail)
router.route("/authenticate").post((req,res)=>{
    res.end()
})
router.route("/login").post(verifyUser,controller.login)


// get request
router.route("/user/:username").get(controller.getUser)
router.route("/generateOTP").get(verifyUser,localVariables,controller.generateOTP)
router.route("/verifyOTP").get(controller.verifyOTP)
router.route("/createResetSession").get(controller.createResetSession)

// put routes

router.route("/updateuser").put(Auth,controller.updateUser)
router.route("/resetPasswo rd").put(verifyUser,controller.resetPassowrd)



