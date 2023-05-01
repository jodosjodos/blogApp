import {Link} from "react-router-dom"
import avatar from "../assets/profile.png"
import styles from "./styles/username.module.css"
import {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import { PassowrdValidate} from "../helper/validate"


export const Password=()=>{
 const formik=useFormik({
    initialValues:{
        password:""
    },
validate:PassowrdValidate,
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
             <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className="text-5xl font-bold">Hello Again</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">Explore More by connecting with us</span>
                </div>
                <form 
                action="" 
                className="py-1" 
                onSubmit={formik.handleSubmit}
                >
                    <div className="profile flex justify-center py-4">
                        <img src={avatar} className={styles.profileImg} alt="avatar" />
                    </div>
                    <div className="textbox flex flex-col items-center   justify-center gap-6">
                        <input 
                        className={styles.textBox} 
                        type="password" 
                        placeholder="password" 
                        {...formik.getFieldProps("password")}
                        />
                        <button type="submit" className={styles.btn}> let&apos;s Go</button>
                    </div>
                    <div className="text-center py-4">
                     <span className="text-gray-500">Forgot passowrd<Link to="/recovery" className="text-red-500">recovery Now</Link></span>
                    </div>
                </form>
              </div>

              
            </div>
        </div>
    )
}