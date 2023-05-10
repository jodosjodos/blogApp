import User from "../model/user.model.js"
import {StatusCodes} from "http-status-codes"
import jwt from "jsonwebtoken"


// create token

const createToken=(_id)=>{
  return  jwt.sign({_id},process.env.JWT_PRIVATE_KEY,{expiresIn:"3d"})
}

export const loginUser=async(req,res)=>{
   try {
    const {email,password}=req.body
    try {
        const user=await User.login(email,password)
        const token=createToken(user._id)
        return res.status(StatusCodes.CREATED).json({email,token})
      } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({err:err.message})
      }
   } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err:err.message})
   }
}

export const signUpUser=async(req,res)=>{
  const{username,email,password}=req.body;
  try {
    const user=await User.signUp(username,email,password)
    const token=createToken(user._id)
    return res.status(StatusCodes.CREATED).json({email,token})
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({err:err.message})
  }

  
}