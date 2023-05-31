import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/reducers/authSlice";
import { userActions } from "../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        {
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
        dispatch(authActions.login({ json }));
      } else if (response.status === 401) {
        setError(json.err);
        console.log(json.err);
        dispatch(authActions.logout());
      } else {
        console.log(json.err);
        setError(json.err);
        dispatch(authActions.logout());
      }
    } catch (err) {
      setError(err.response?.data ?? "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error ,setError};
};
