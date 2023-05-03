import { StatusCodes } from "http-status-codes"
import Jwt  from "jsonwebtoken";
export const Auth=async(req,res,next)=>{
 try {
    
    const token=await req.headers.authorization.split(" ")[1];
   const decodedToken=await Jwt.verify(token,'secreat')
    req.user=decodedToken
   
    next()
 } catch (err) {
     res.status(StatusCodes.UNAUTHORIZED).send({msg:"authorization failed"})
 }
}



export const localVariables=(req,res,next)=>{
    req.app.locals={
        OTP:null,
        resetSession:false
    }
    next()
}