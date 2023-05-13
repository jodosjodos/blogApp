import mongoose  from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator"

export const UserSchema=new mongoose.Schema({
     username:{
        type:String,
        require:[true,"please provide username"],
        unique:true
     },
     password:{
        type:String,
        require:[true,'please provide password']
     },
     email:{
        type:String,
        require:[true,"please provide email"],
        unique:true
     },
    
     
    
})

//
UserSchema.statics.signUp=async function(username,email,password){
// validation
if(!email || ! password || !username){
   throw Error("all fields are required")
}

if(!validator.isEmail(email)){
   throw Error("please provide valid email")
}
if(!validator.isStrongPassword(password)){
   throw Error("please provide strong and valid  password")
}
if(!validator.isLength(username,{min:4}) || !validator.isLowercase(username)){
   throw Error("username must be  more than 4 characters long and must be in lower case")
}

const existEmail=await this.findOne({email})
const existUsername=await this.findOne({username})
if(existEmail  || existUsername){
   throw Error("username or email already taken")
}

const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)

const user= await this.create({username,email,password:hashedPassword})
return user

}


// login verification
UserSchema.statics.login=async function(email,password){
   if(!email || ! password )  throw Error("all fields are required")
 

   const user=await this.findOne({email})
   if(!user)  throw Error("incorrect credentials")
   const match=await bcrypt.compare(password,user.password);
   if(!match) throw Error("invalid credentials")
   return user;
}

export default mongoose.model("User",UserSchema)