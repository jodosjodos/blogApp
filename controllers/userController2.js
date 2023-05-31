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
     const updateData = {};
 
     if (req.body.username) {
       updateData.username = req.body.username;
     }
 
     if (req.body.email) {
       updateData.email = req.body.email;
     }
 
     if (req.body.password) {
       if (!validator.isStrongPassword(req.body.password)) {
         throw new Error("Please provide a strong and valid password");
       }
       const salt = await bcrypt.genSalt(10);
       updateData.password = await bcrypt.hash(req.body.password, salt);
     }
 
     const updatedUser = await User.findOneAndUpdate(
       { email: email, username: username },
       updateData,
       { new: true }
     );
 
     if (!updatedUser) {
       return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
     }
 
     return res.status(StatusCodes.CREATED).json({
       _id: updatedUser._id,
       avatar: updatedUser.avatar,
       username: updatedUser.username,
       email: updatedUser.email,
       verified: updatedUser.verified,
       admin: updatedUser.admin,
       token: await createToken(updatedUser._id),
     });
   } catch (err) {
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
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
   //  console.log(req.user);

            if(req.file){
               let filename;
              let updatedUser=await User.findById(req.user._id);
              filename=updatedUser.avatar;
              if(filename){
               fileRemover(filename)
              }
              updatedUser.avatar=req.file.filename
              await updatedUser.save()

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


export const userProfile=async(req,res,next)=>{
   try {
      let user=await User.findById(req.user._id)

      if(user){
         return res.status(StatusCodes.OK).json({
            _id:user._id,
               avatar:user.avatar,
               username:user.username,
               email:user.email,
               verified:user.verified,
               admin:user.admin,
         })
      }else {
         let error = new Error("User not found");
         error.statusCode = 404;
         next(error);
      }
   } catch (err) {
      return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
     
   }
}