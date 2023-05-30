import express from "express" 
import cors from "cors"
import morgan from "morgan"
import { connect } from "./db/conn.js"
import { userRouter } from "./route/user.js"
import  * as dotenv from "dotenv"


dotenv.config()

const app=express()

// middleware
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
    }
))
app.use(morgan("tiny"))
app.disable("x-powered-by")


const port=process.env.PORT || 3000

// get req
app.use("/api/user",userRouter)

// db connection
connect().then(()=>{
    try {
        app.listen(port,()=>{
            console.log(`server is connnected to http://localhost:${port}`);
        })  
    } catch (err) {
        console.log('not connected');
    }
   
    
})
.catch((err)=>{
console.log('can\'t connect ');
console.log(err);
})
