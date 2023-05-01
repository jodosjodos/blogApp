import {Link} from "react-router-dom"
import avatar from "../assets/profile.png"
import styles from "./styles/username.module.css"
import {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import { profileValidation} from "../helper/validate"
import { useState } from "react"
import { convertToBase64 } from "../helper/convert"
import extend from "./styles/profile.module.css"


export const Profile=()=>{
 const [file,setFile]=useState("")


 const formik=useFormik({
    initialValues:{
        firstName:"",
        lastName:"",
        email:"",
        mobileNumber:"",
        address:""
    },
validate:profileValidation,
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
             <div className={`${styles.glass}${extend.glass} `} style={{width:"45%"}}>
                <div className="title flex flex-col items-center">
                    <h4 className="text-5xl font-bold">Profile</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">You can update your details</span>
                </div>
                <form 
                action="" 
                className="py-1" 
                onSubmit={formik.handleSubmit}
                >
                    <div className="profile flex justify-center py-4">
                        <label htmlFor="profile">
                        <img src={file || avatar} className={`${styles.profileImg}${extend.profile}`} alt="avatar" />
                        </label>
                        <input 
                        type="file" 
                        id="profile" 
                        name="profile"
                        onChange={onUpload}
                        />

                    </div>
                    <div className="textbox flex flex-col items-center   justify-center gap-6">
                        <div 
                        className="name flex w-3/4 gap-10"
                        >
                          <input 
                        className={`${styles.textBox} ${extend.textBox}`} 
                        type="text" 
                        placeholder="first name" 
                        {...formik.getFieldProps("firstName")}
                        />
                         <input 
                      className={`${styles.textBox} ${extend.textBox}`}
                        type="text" 
                        placeholder="last name" 
                        {...formik.getFieldProps("lastName")}
                        />   
                        </div>
                        <div 
                        className="name flex w-3/4 gap-10"
                        >
                          <input 
                       className={`${styles.textBox} ${extend.textBox}`}
                        type="text" 
                        placeholder="mobile number" 
                        {...formik.getFieldProps("mobileNumber")}
                        />
                         <input 
                      className={`${styles.textBox} ${extend.textBox}`} 
                        type="text" 
                        placeholder="email " 
                        {...formik.getFieldProps("email")}
                        />   
                        </div>
                        
                          <input 
                       className={`${styles.textBox} ${extend.textBox}`}
                        type="text" 
                        placeholder="address" 
                        {...formik.getFieldProps("address")}
                        />
                        <button type="submit" className={styles.btn}>Update</button>
                        
                       
                        
                    </div>
                    <div className="text-center py-4">
                     <span className="text-gray-500">come back again?<Link to="/" className="text-red-500">Logout</Link></span>
                    </div>
                </form>
              </div>

              
            </div>
        </div>
    )
}