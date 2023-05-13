import express from "express"
const router=express.Router()
import passport from "passport";
import { savingUser } from "../middlwares/googleSaving.js";




router.get("/login/fail",(req,res)=>{
    res.status(401).send({msg:"u have failed due to many things"})
})
router.get("/login/sucess",savingUser)

router.get("/google",passport.authenticate("google",{
    scope:["profile","email"]
}))



router.get("/google/callback",passport.authenticate("google",{
    successRedirect:`/login/success`,
    failureRedirect:"/login/fail"
}))

export default router