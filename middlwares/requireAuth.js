import { StatusCodes } from "http-status-codes"
import Jwt  from "jsonwebtoken"
import User from "../model/user.model"

export const requireAuth=async(req,res,next)=>{
    // authentication
  const {Authorization} = req.headers
  if(!Authorization){
    return res.status(StatusCodes.UNAUTHORIZED).json({error:"Authorization token required"})
}

const token =Authorization.split(" ")[1]
try {
   const {_id}= Jwt.verify(token,process.env.JWT_PRIVATE_KEY)
   req.user=await User.findOne({_id}).select({_id,username})
   next()
} catch (error) {
    console.log(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({error:"request is not authorization"})
}

}