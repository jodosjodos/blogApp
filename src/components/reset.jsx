
import styles from "./styles/username.module.css"
import {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import { resetPasswordValidation } from "../helper/validate"


export const Reset=()=>{
 const formik=useFormik({
    initialValues:{
        password:"",
        confirmPassword:""
    },
validate:resetPasswordValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
        console.log(values);
    }
 })



    return(
        <div className="container mx-auto">
            <Toaster position="top-center"  reverseOrder={false}></Toaster>
            <div className="flex  h-scree justify-center items-center">
             <div className={styles.glass} style={{width:"50%"}}>
                <div className="title flex flex-col items-center">
                    <h4 className="text-5xl font-bold">Reset </h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter your password</span>
                </div>
                <form 
                action="" 
                className="py-20" 
                onSubmit={formik.handleSubmit}
                >
                   
                    <div className="textbox flex flex-col items-center   justify-center gap-6">
                        <input 
                        className={styles.textBox} 
                        type="password" 
                        placeholder="new password" 
                        {...formik.getFieldProps("password")}
                        />
                        <input 
                        className={styles.textBox} 
                        type="password" 
                        placeholder="repeat new password" 
                        {...formik.getFieldProps("confirmPassword")}
                        />
                        
                        <button type="submit" className={styles.btn}>Reset</button>
                    </div>
                   
                </form>
              </div>

              
            </div>
        </div>
    )
}