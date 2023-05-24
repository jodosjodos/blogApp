import { useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";

export const ForgotPasswordComponent = () => {
  const mode = useSelector((state) => state.mode.mode);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const setEmailFunction = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
    setMessage("");
  };

  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      if (email === "") {
        setErrorMessage("email must not be empty");
        return;
      }
      const res = await axios.post(
        "http://localhost:3000/api/user/sendPasswordLink",
        { email }
      );
      if (res.status === 201) {
        setMessage(res.data.msg);
      }
    } catch (err) {
      const error = err.response.data.err;
      setErrorMessage(error);
    }
  };
  if (errorMessage && message) {
    setEmail("");
  }

  return (
    <div
      className={`  ${mode === "dark" ? "dark" : "round"} w-[30vw] h-[40vh]`}
    >
      <div className=" flex flex-col ">
        <h1 className="flex flex-col items-center mt-9 text-xl">
          Enter your email for getting reset link
        </h1>
        {message && (
          <p className="flex flex-col items-center text-green-700 font-semibold font-serif  mt-1">
            {message}
          </p>
        )}
        {errorMessage && (
          <p className="flex flex-col items-center text-red-700  font-serif  mt-1">
            {errorMessage}
          </p>
        )}
        <div className="mt-4 flex flex-cols p-9">
          <input
            className={`${
              mode === "dark" ? "darkFields" : "inputField"
            }  w-[100%]`}
            type="email"
            placeholder="enter your email for reseting password"
            id="email"
            required
            onChange={setEmailFunction}
            value={email}
          />
        </div>
        <div className="flex flex-cols px-9">
          <button
            type="button"
            className="signUp text-white  w-[80vw]"
            onClick={sendEmail}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
