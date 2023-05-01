import toast from "react-hot-toast"

// validate login page username
export const UsernameValidate=async(values)=>{
    const errors=UsernameVerify({},values)
    return errors
}


//  validate username
 const  UsernameVerify=(error={},values)=>{
    if(!values.username){
        error.username=toast.error("username required")
    }else if(values.username.includes(" ")){
        error.username=toast.error("invalid username")
    }
    return error
}


export const PassowrdValidate=async(values)=>{
    const errors=passwordVerify({},values)
    return errors
}

// validate passowrd
const passwordVerify=(errors={},values)=>{

    const specialChars=/[`!@#$%^&*()_+\-=[\]{},':"\\|,.<>/?~]/

    if(!values.password){
        errors.password=toast.error("password required ..!")
    }else if(values.password.includes(" ")){
        errors.password=toast.error("no space in password")
    }else if(values.password.length <4){
        errors.password=toast.error("password must be more than 4 characters")
    }else if(!specialChars.test(values.password)){
        errors.password=toast.error("password must contain any special character")
    }
    return errors 
}


// validate reset password
export const resetPasswordValidation=async(values)=>{
    const errors=passwordVerify({},values)
    if(values.password !== values.confirmPassword){
        errors.exist=toast.error("password doesn't match")
    }
    return errors
}


// validate register form
export const registerValidation=(values)=>{
    const errors=UsernameVerify({},values)
    passwordVerify(errors,values)
    emailVerify(errors,values)
}


//  validate email
const emailVerify=(errors={},values)=>{
    if(!values.email){
        errors.email=toast.error("email required ")
    }else if(values.email.includes(" ")){
        errors.email=toast.error("email doesn't contain white space")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
     errors.email=toast.error("invalid email address..")
    }
    return errors
}



//  validate profile page
export const profileValidation=async(values)=>{
    const errors=emailVerify({},values)
    return errors
}