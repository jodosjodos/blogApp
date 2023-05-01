import mongoose  from "mongoose";

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
     firstName:{type:String},
     lastName:{type:String},
     mobileNumber:{type:Number}
})

export default  mongoose.model.Users|| mongoose.model("USer",UserSchema)