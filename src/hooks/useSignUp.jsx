import { useState } from "react";

import axios from "axios";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const signUp = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signUp",
        {
          username,
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
      } else if (response.status === 401) {
        setError(json.err);
        console.log(json.err);
      } else {
        console.log(json.err);
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
