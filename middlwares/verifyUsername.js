import { StatusCodes } from "http-status-codes";
import userModel from "../model/user.model.js"
export const verifyUser=async(req,res,next)=>{
     try {
         const {username}=req.method=='GET'? req.query:req.body
         const exist=await userModel.findOne({username})
         if(!exist){
            res.status(StatusCodes.FORBIDDEN).send({msg:"user can't be found"})
         }else{
            next()
         }
     } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({err:"authentication failed"})
     }
}