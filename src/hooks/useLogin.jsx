import { useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";



export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const dispatch2=useDispatch()

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        }
      );
      const json = response.data;

      if (response.status === 201) {
        // save user to local storage
        localStorage.setItem("userCredentials", JSON.stringify(json));
        console.log(json);

        // update auth context
        
        setIsLoading(false);
        dispatch2(authActions.login({json}));
        

      } else if (response.status === 401) {
        setError(json.err);
        console.log(json.err);
        dispatch2(authActions.logout());

      } else {
        console.log(json.err);
        setError(json.err);
        dispatch2(authActions.logout());

      }
    } catch (err) {
      setError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  

  return { login, isLoading, error, setError };
};
