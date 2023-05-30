import { StatusCodes } from "http-status-codes";
import User from "../model/user.model.js";
import { createToken } from "./userController.js";
import bcrypt from "bcrypt"
import validator from "validator";
import { uploadPicture } from "../middlwares/uploadPictureMiddlware.js";
import { fileRemover } from "../utils/fileRemover.js";

export const updateProfile = async (req, res, next) => {
  try {
    const { email, username } = req.user;
    
    if(!validator.isStrongPassword(req.body.password)){
      throw Error("please provide strong and valid  password")
   }

if(req.body.password){
   const salt=await bcrypt.genSalt(10)
   req.body.password=await bcrypt.hash(req.body.password,salt)
}
    const updatedUser = await User.findOneAndUpdate(
      { email: email, username: username },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    return res.status(StatusCodes.CREATED).json({
      _id:updatedUser._id,
      avatar:updatedUser.avatar,
      username:updatedUser.username,
      email:updatedUser.email,
      verified:updatedUser.verified,
      admin:updatedUser.admin,
      token:await createToken(updatedUser._id)
    
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};





export const updateProfilePicture=async(req,res,next)=>{
   try {
      const upload= uploadPicture.single("profilePicture");
      upload(req,res, async (err)=>{
         if(err){
            const error=new Error("An unknow error has occured when uploading" + err.message)
            next(error)
         }else{


            if(req.file){
              const updatedUser=await User.findByIdAndUpdate(req.user._id,{
               avatar:req.file.filename
              },{new:true})

              return res.status(StatusCodes.CREATED).json({
               _id:updatedUser._id,
               avatar:updatedUser.avatar,
               username:updatedUser.username,
               email:updatedUser.email,
               verified:updatedUser.verified,
               admin:updatedUser.admin,
               token:await createToken(updatedUser._id)
              })
            }else {
               let filename;
               let updatedUser=await User.findById(req.user._id);
               filename=updatedUser.avatar;
               updatedUser.avatar="";
               await updatedUser.save()
               fileRemover(filename);
               return res.json({
                  _id:updatedUser._id,
               avatar:updatedUser.avatar,
               username:updatedUser.username,
               email:updatedUser.email,
               verified:updatedUser.verified,
               admin:updatedUser.admin,
               token:await createToken(updatedUser._id)
               })
            }
         }

         // no error


   
      })
   } catch (err) {
      return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
   }
}