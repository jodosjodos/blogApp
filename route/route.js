import { Router } from "express";
export const router=Router()


// middlwares
import { verifyUser } from "../middlwares/verifyUsername.js";

// all controllers
import * as controller from "../controllers/appController.js"

router.route("/register").post(controller.register)
// router.route("/registerMail").post()
router.route("/authenticate").post((req,res)=>{
    res.end()
})
router.route("/login").post(verifyUser,controller.login)


// get request
router.route("/user/:username").get(controller.getUser)
router.route("/generateOTP").get(controller.generateOTP)
router.route("/verifyOTP").get(controller.verifyOTP)
router.route("/createResetSession").get(controller.createResetSession)

// put routes

router.route("/updateuser/:id").put(controller.updateUser)
router.route("/resetPassowrd").put(controller.resetPassowrd)



