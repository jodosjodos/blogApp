import mongoose  from "mongoose";


export const connect=async()=>{
;
 mongoose.set("strictQuery",true)
    const db=await mongoose.connect("mongodb://127.0.0.1:27017/blogApp")
    console.log('db is connected');
    return db  
}