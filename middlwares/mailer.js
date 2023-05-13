import { StatusCodes } from "http-status-codes";
import Mailgen from "mailgen"
import  * as dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"

export const  sendMail=async(req,res,next)=>{
    try {
         const {email}=req.body
       
   

          let config={
            service:"gmail",
            auth:{
              user:process.env.EMAIL,
              pass:process.env.EMAIL_PASSWORD
            }
          }
          let transporter=nodemailer.createTransport(config)
 let MailGenerator=new Mailgen({
   theme:"default",
   product:{
    name:"Mailgen",
    link:"https://mailgen.js/"
   }
 })

 let response={
    body:{
      
        intro:"welcome to ipsum blog app 🍾🎉 "+email,
        body:"you have signed up successfuly ,welcome",
        outro:"looking forward to you enjoying features of ipsum blog app"
    }
 }
 let mail=await MailGenerator.generate(response)
 let message={
    from:process.env.EMAIL,
    to:email,
     subject:"sign up to my blog app",
     html:mail
 }
   const info=await transporter.sendMail(message)
          if(info){
            next()
        }
          
       
            
           
    } catch (err) {
      console.log(err); 
      next(err)
      return  
    }
}