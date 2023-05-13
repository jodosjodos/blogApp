import { Link } from "react-router-dom";



import { FcGoogle } from "react-icons/fc";
import {BiShow,BiHide} from "react-icons/bi"
import { useContext, useState } from "react";
import { Mode } from "./navbar";

import { useLogin } from "../hooks/useLogin";
// import {  useSelector } from "react-redux";


export const LoginComponent = () => {
  const mode = useContext(Mode);
 
//  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)

    // show password state
    const [showPassword,setShowPassword]=useState(false )
    const handleShow=()=>{
     setShowPassword(prev=>!prev  )
    }

  //    functiion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading, setError } = useLogin();

  const handleSubmission = async (e) => {
    e.preventDefault();
    await login(email, password);
  

  };
  

  // google things
  const google=()=>{
    window.open("http://localhost:3000/auth/google")
  }
  

  return (
   
    <div className={`p-9  ${mode === "dark" ? "dark" : "round"}`}>
      <div>
        
      </div>
      <div className=" ">
        <div className="flex  flex-col justify-center items-center pb-5">
          <h4 className="title ">Welcome Back</h4>
          <span className={` ${mode === "dark" ? "wantDark" : "want"}  `}>
            We missed you please enter your details
          </span>
        </div>
        <section>
          <form action="" onSubmit={handleSubmission}>
            <div className="grid grid-rows-7 gap-8">
              <div>
                <label htmlFor="email" className="block pb-3   font-bold ">
                  Email
                </label>
                <div>
                  <input
                    className={`${
                      mode === "dark" ? "darkFields" : "inputField"
                    }`}
                    type="email"
                    placeholder="enter your email"
                    id="email"
                    onChange={(e) => {
                      setEmail(e.target.value), setError("");
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block  pb-3  font-bold ">
                  Password
                </label>
                <div className="relative">
                  <input
                    className={`${
                      mode === "dark" ? "darkFields" : "inputField"
                    }`}
                    type={`${showPassword?"text":"password"}`}
                    placeholder=" enter your password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value), setError("");
                    }}
                    
                  />
                  <span onClick={handleShow} className="show">{showPassword?<BiHide size={25}/>:<BiShow size={25} />}</span>
                </div>
              </div>
              <div className="grid grid-cols-2  gap-16">
                <div className="">
                  <input type="checkbox" id="rember" />
                  <label htmlFor="rember">Remember me</label>
                </div>
                <span className="forgot selft-center  mt-2">
                  <a href="#">Forgot Password?</a>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="signUp text-white "
                  disabled={isLoading}
                >
                  Sign In
                </button>
                {error && <p className=" flex text-red-800 justify-center items-center font-semibold  mt-2">{error.err}</p>}
              </div>
              <div>
                <a
                  className={`signUp ${
                    mode === "dark" ? "byGoogleDark" : " byGoogle"
                  }`}
                  onClick={google}
                >
                  {" "}
                  <span className="googleIcon " onClick={google}>
                    <FcGoogle />
                  </span>{" "}
                  continue with google
                </a>
              </div>
              <div>
                <span className="">
                  Don&apos;t have an account,
                  <Link to="/register" className="signIn font-bold">
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
