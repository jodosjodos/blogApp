import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"


import axios from "axios";
import { userActions } from "../store/reducers/userReducer";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  const dispatch=useDispatch()

  const signUp = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/signUp",
        {
          username,
          email,
          password,
        }
      );
      const json = response.data;

      if (response.status === 201) {
        // save user to local storage
        setIsLoading(false);
        dispatch(userActions.setUserInfo(json))
        localStorage.setItem("account", JSON.stringify(json));
        console.log(json);
        Navigate("/");

        // update auth context

      } else if (response.status === 401) {
        setError(json.err);
      
      } else {
        
        setError(json.err);
      }
    } catch (err) {
      
      setError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error, setError };
};
