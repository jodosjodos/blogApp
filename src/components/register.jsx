import {Link} from "react-router-dom"
import avatar from "../assets/profile.png"
import styles from "./styles/username.module.css"
import {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import { registerValidation} from "../helper/validate"
import { useState } from "react"
import { convertToBase64 } from "../helper/convert"


export const RegisterComponent=()=>{
 const [file,setFile]=useState("")


 const formik=useFormik({
    initialValues:{
        email:"example@gmail.com",
        username:"example123",
        password:""
    },
validate:registerValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
        values=await Object.assign(values,{profile:file || ""})
        console.log(values);
    }
 })


// function to handle file upload
const onUpload=async e=>{
    const base64=await  convertToBase64(e.target.files[0])
    setFile(base64)
}


    return(
        <div className="container mx-auto">
          <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    style: {
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
    // Enable the close button
    toast: true,
  }}
/>

            <div className="flex  h-scree justify-center items-center">
             <div className={styles.glass} style={{width:"45%"}}>
                <div className="title flex flex-col items-center">
                    <h4 className="text-5xl font-bold">Register</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">Happy to join !</span>
                </div>
                <form 
                action="" 
                className="py-1" 
                onSubmit={formik.handleSubmit}
                >
                    <div className="profile flex justify-center py-4">
                        <label htmlFor="profile">
                        <img src={file || avatar} className={styles.profileImg} alt="avatar" />
                        </label>
                        <input 
                        type="file" 
                        id="profile" 
                        name="profile"
                        onChange={onUpload}
                        />

                    </div>
                    <div className="textbox flex flex-col items-center   justify-center gap-6">
                        <input 
                        className={styles.textBox} 
                        type="email" 
                        placeholder="Email*" 
                        {...formik.getFieldProps("email")}
                        />
                         <input 
                        className={styles.textBox} 
                        type="text" 
                        placeholder="username*" 
                        {...formik.getFieldProps("username")}
                        />
                         <input 
                        className={styles.textBox} 
                        type="password" 
                        placeholder="password" 
                        {...formik.getFieldProps("password")}
                        />
                        <button type="submit" className={styles.btn}>Register</button>
                    </div>
                    <div className="text-center py-4">
                     <span className="text-gray-500">Already register?<Link to="/login" className="text-red-500">Login</Link></span>
                    </div>
                </form>
              </div>

              
            </div>
        </div>
    )
}