import { useContext, useState } from "react";
import { Mode } from "./navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ResetPasswordComponent = () => {
  const mode = useContext(Mode);


  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

 const {id}=useParams();

 

 

  return (
    <div
      className={`  ${mode === "dark" ? "dark" : "round"} w-[30vw] h-[40vh]`}
    >
      <div className=" flex flex-col ">
        <h1 className="flex flex-col items-center mt-9 text-xl">
          Enter new password  
        </h1>
        {message && (
          <p className="flex flex-col items-center text-green-700 font-semibold font-serif  mt-1">
            {message}
          </p>
        )}
        {errorMessage && <p className="flex flex-col items-center text-red-700  font-serif  mt-1">{errorMessage}</p>}
        <div className="mt-4 flex flex-cols p-9">
          
          <input
            className={`${
              mode === "dark" ? "darkFields" : "inputField"
            }  w-[80vw]`}
            type="password"
            placeholder="enter your email for reseting password"
            id="email"
            required
        
           
          />
          
         
        </div>
        <div className="flex flex-cols px-9">
          <button
            type="button"
            className="signUp text-white  w-[80vw]"
         
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
