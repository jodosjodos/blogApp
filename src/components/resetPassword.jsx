import { useEffect, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const ResetPasswordComponent = () => {
  const mode = useSelector((state) => state.mode.mode);

  const [message, setMessage] = useState("");
  const [found, setFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();

  // show password state
  const [showPassword, setShowPassword] = useState(false);
  const handleShow = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = async () => {
    const res = await axios.get("http://localhost:3000/api/user/validate/", {
      params: { id },
    });
    if (res.status == 201) {
      setErrorMessage("");
      setFound(true);
    } else {
      setErrorMessage("");
    }
  };

  const validatePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setErrorMessage("");
    setMessage("");
  };

  const sendPassword = async (e) => {
    try {
      e.preventDefault();
      const strongPasswordPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|\\:;"'<>,.?/~`]).{8,}$/;
      if (strongPasswordPattern.test(password)) {
        const res = await axios.put(
          "http://localhost:3000/api/user/updateUser/",
          { password },
          { params: { id } }
        );
        if (res) {
          setMessage("password updated successsfully");
          setPassword("");
        }

        return;
      } else {
        setErrorMessage("please provide strong password");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("error occured");
    }
  };

  useEffect(() => {
    return async () => {
      await validate();
      if (found) {
        sendPassword();
      }
    };
  }, [found]);

  return (
    <div
      className={`  ${mode === "dark" ? "dark" : "round"} w-[30vw] h-[50vh]`}
    >
      <div className=" flex flex-col ">
        <h1 className="flex flex-col items-center mt-9 text-xl">
          Enter new password
        </h1>
        {message && (
          <p className="flex flex-col items-center forColors font-semibold font-serif  mt-1">
            {message}
          </p>
        )}
        {errorMessage && (
          <p className="flex flex-col items-center text-red-700  font-serif  mt-1">
            {errorMessage}
          </p>
        )}
        <div className="flex flex-col items-center justify-center relative my-12">
          <input
            className={`${
              mode === "dark" ? "darkFields" : "inputField"
            }  w-[80%]`}
            type={`${showPassword ? "text" : "password"}`}
            placeholder=" enter your password"
            id="password"
            onChange={validatePassword}
          />
          <span onClick={handleShow} className="show right-12">
            {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
          </span>
        </div>

        <div className="flex flex-cols px-9">
          <button
            type="submit"
            className="signUp text-white  w-[80vw]"
            onClick={sendPassword}
          >
            Send
          </button>
        </div>
        <a
          href="/login"
          className="mt-2 flex flex-col items-center forColors underline"
        >
          back home
        </a>
      </div>
    </div>
  );
};
