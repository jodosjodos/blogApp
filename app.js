import express from "express" 
import cors from "cors"
import morgan from "morgan"
import { connect } from "./db/conn.js"
import { userRouter } from "./route/user.js"
import  * as dotenv from "dotenv"

// google auth
import cookieSession from "cookie-session"
import passport from "passport"
import passportSetup from "./controllers/passport.js"
import GoogleRouter from "./route/auth.js"
// import SuccessRouter from "./route/succes.js"
import { savingUser } from "./middlwares/googleSaving.js"

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

// google auth
app.use(cookieSession({
    name:"session",
    keys:[process.env.COOKIE_SECRET],
    maxAge:72*60*60*100
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/auth",GoogleRouter)
app.use(savingUser);


const port=process.env.PORT


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

//  server
