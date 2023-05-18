import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken"
dotenv.config();
let config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);

export const resetPasswordLink = async (req, res) => {
   
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ msg: "send email or valid email" });
    }

    const userFound = await User.find({ email });
    if (userFound.length==0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ err: "eamil not found" });
    }
    const id=userFound[0]._id
    const emailOfUser=userFound[0].email
    const randomString = Math.random().toString(36).replace(".", "");
    const customToken = `${id}_${randomString}`;
    
    
    
   console.log(id);
  
   const mailOptions={
    from:process.env.EMAIL,
    to:email,
    subject:"sending email for password reset",
    text:` the token is   http://localhost:5173/forgot-password/${id}/${customToken}`
   }
   
   transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
        console.log(err);
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).send({err:"email not sent"})
    }
    else{
        // console.log("infooooao",info);
        res.status(StatusCodes.CREATED).send({msg:"email sent successfully"})

    }
   })

  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({err: err });
  }
};
