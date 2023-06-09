import express from "express" 
import cors from "cors"
import morgan from "morgan"
import { connect } from "./db/conn.js"
import { router } from "./route/route.js"
import  * as dotenv from "dotenv"
dotenv.config()

const app=express()


// middleware
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.disable("x-powered-by")

const port=3000


// get req
app.get("/",(req,res)=>{
    res.status(201).json("home get request")
})
app.use("/api",router)




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

//  server
