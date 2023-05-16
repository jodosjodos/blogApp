import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { Mode } from "./navbar";
import { signInWithGoogle } from "../config/firebase";

export const RegisterComponent = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading, error, setError } = useSignUp();

  // mode
  const mode = useContext(Mode);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, email, password);
    await signUp(username, email, password);
  };

  // google things
  const google = async () => {
    const result = await signInWithGoogle();

    const username = result.user.displayName;
    const email = result.user.email;
    const password = "jeandedieu2030@gmail.comN?";
    await signUp(username, email, password);
  };

  return (
    <div className={`${mode === "dark" ? "dark" : "round"}  px-12 py-5    `}>
      <div></div>
      <div>
        <div className="flex  flex-col justify-center items-center pb-5 ">
          <h4 className="title ">Welcome to ipsum</h4>
          <span className={` ${mode === "dark" ? "wantDark" : "want"}  `}>
            You might want to chat right now
          </span>
        </div>
        <section>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-rows-8 gap-4">
              <div>
                <label
                  className="block pb-3   font-bold pl-2"
                  htmlFor="username"
                >
                  username
                </label>
                <div>
                  <input
                    className={`${
                      mode === "dark" ? "darkFields" : "inputField"
                    }`}
                    type="text"
                    placeholder="enter your username"
                    id="username"
                    onChange={(e) => {
                      setusername(e.target.value), setError(null);
                    }}
                    value={username}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className=" block pb-3   font-bold pl-2">
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
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    value={email}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block pb-3   font-bold pl-2"
                >
                  Password
                </label>
                <div>
                  <input
                    className={`${
                      mode === "dark" ? "darkFields" : "inputField"
                    }`}
                    type="password"
                    placeholder=" enter your password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    value={password}
                    required
                  />
                </div>
              </div>
              <div>
                <input type="checkbox" id="rember" />
                <label htmlFor="rember">Remember me</label>
              </div>
              <div>
                <button
                  type="submit"
                  className="signUp text-white sm:mb-3 "
                  disabled={isLoading}
                >
                  Sign Up
                </button>
                {error && <p className="text-red-700"> {error}</p>}
              </div>
              <div>
                <a
                  className={`signUp  cursor-pointer${
                    mode === "dark" ? "byGoogleDark" : " byGoogle"
                  }`}
                  onClick={google}
                >
                  {" "}
                  <span className="googleIcon">
                    <FcGoogle />
                  </span>{" "}
                  continue with goole
                </a>
              </div>
              <div>
                <span className="">
                  Already have an account ?
                  <Link to="/login" className="signIn font-bold">
                    Sign in
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
