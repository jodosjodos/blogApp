import userModel from "../model/user.model.js"
import {StatusCodes} from "http-status-codes"
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken"




// console.log(process.env.jwtSecret);

//  saving user credential who make for create account // POST
export const register=async(req,res)=>{
    try {
        const {email,username,password,profile}=req.body
        if(username,email,password){

         
            try {
                const existUser=await userModel.findOne({username})
                if(existUser){
                    res.status(StatusCodes.BAD_GATEWAY).send({error:"please provide unique name"})
                    return;
                }else{
                const existEmail=await userModel.findOne({email})
                if(existEmail){
                    res.status(StatusCodes.BAD_GATEWAY).send({error:"please provide unique email"})
                    return;
                }else{
                const hashedPassword= await bcrypt.hash(password,10)
                 try {
                    const user= await userModel({
                        username,
                        email,
                        password:hashedPassword,
                        profile
                       
                        
                    })
                    

                    await user.save()
                    return res
                    .status(StatusCodes.CREATED)
                    .send({ msg: "User saved successfully" });
                 } catch (err) {
                    console.log(err);
             res.status(Status .INTERNAL_SERVER_ERROR).send({err:err})
             return
                 }
                }
                }
                
            } catch (err) {
                console.log(err);
                return err
            }
         

        }else{
            res.status(StatusCodes.BAD_REQUEST).send({msg:"please provide credentials"})
            return
        }
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
    }
    
}


// login //POST
export const login=async(req,res)=>{  
  const {username,password}=req.body;
  if(username && password){
    try {
        const user=await userModel.findOne({username})
        if(user){
         const check=await bcrypt.compare(password,user.password)
        try {
            if(check){
            const token=Jwt.sign({
                userId:user._id,
                username:user.username
            },"secreat",{expiresIn:"24h"})
    
            res.status(StatusCodes.OK).send({
                msg:" login successfully",
                username:user.username,
                token
            })
            }else{
                return res.status(StatusCodes.BAD_REQUEST).send({err:"invalid credential"})
            }
        } catch (err) {
            return res.status(StatusCodes.BAD_REQUEST).send({err:err})
        }
        }else{
            return res.status(StatusCodes.NOT_FOUND).send({err:"user not found"})
        }
      } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({err:err})
      }
  }else{
    return res.status(StatusCodes.BAD_REQUEST).send({msg:"please provide username and password"})
  }
  
}

// get individual user daata // GET
export const getUser=async(req,res)=>{
 const {username}=req.params
 try {
  if(!username){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({msg:"invalid username"})
}  
const user = await userModel.findOne({username})
if(!user){
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({msg:"error occured user not found"})
}
const {password,...rest}=Object.assign({},user.toJSON())
return res.status(StatusCodes.CREATED).send(rest)

    
 } catch (err) {
  return   res.status(StatusCodes.BAD_REQUEST).send({msg:"can't find user data"})
 }
}

// update user // PUT
export const updateUser=async(req,res)=>{
   try {
    const {id}=req.params
    if(id){
    const body=req.body;
    const updatedUser=await userModel.updateOne({_id:id},body)
    if(updatedUser){
    res.status(StatusCodes.CREATED).send({msg:"user updated"})
    }else{
        res.status(StatusCodes.BAD_REQUEST).send({msg:"invalid credentials"})
    }
    }else{
        return res.status(StatusCodes.UNAUTHORIZED).send({err:"user not found"})
    }
   } catch (err) {
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({err:err.message})
   }
}

// generate OTP  //
export const generateOTP=async(req,res)=>{
    res.json("OTP route")
}

// verify OTP // GET
export const verifyOTP=async(req,res)=>{
    res.json(" verify OTP  route")
}


// RESET  password when OTP IS valid then redirect user to reset password page //get
export const createResetSession=async(req,res)=>{
    res.json("create reset session  route")
}


// update user password for valid OTP //put
export const resetPassowrd=async(req,res)=>{
    res.json("login route")
}