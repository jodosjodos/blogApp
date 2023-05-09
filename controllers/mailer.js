import nodemailer from "nodemailer"
import  mailgen from "mailgen"
import {StatusCodes} from "http-status-codes"
import * as dotenv from "dotenv"
dotenv.config()


let mailConfig={
    host:"smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
}
let transporter=nodemailer.createTransport(mailConfig);
let MailGenerator=new mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:"http://mailgen.js/"
    }
})

export const registerMail=async(req,res)=>{
    try {
        const {username,userEmail,text,subject}=req.body;
    let email={
        body:{
            name:username,
            intro:text || "welcome to lorem ipsum blog ",
            outro:"need help ,or have question ? just reply this email"
        }
    }
    let emailBody =MailGenerator.generate(email);
    let message={
        from:'barrett.schowalter69@ethereal.email',
        to:userEmail,
        subject:subject || "sign up successfuly",
        html:emailBody
    }


    // send mail
   const response=await transporter.sendMail(message)
   try {
    if(response){
    return res.status(StatusCodes.OK).send({msg:"you should reveive email from  us"})
    }
   } catch (err) {
    console.log(err);
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({err:err})
   }
    } catch (err) {
        console.log(err);
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({err:err})
    }
    
}
