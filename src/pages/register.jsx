
import { RegisterComponent } from "../components/register";

import { RiChat1Line } from "react-icons/ri";
// import { Mode } from "../components/navbar";
import { useSelector } from "react-redux";
// import styles from "../components/styles/username.module.css"

export const Register = () => {
  const mode = useSelector(state=>state.mode.mode)
  return (
    <main
      className={`h-[100vh] w-full    flex flex-col  justify-center items-center ${
        mode === "dark" ? "darkPage" : "big"
      }`}
    >
      <div
        className={`flex items-center  ${mode === "dark" ? "logoDark" : ""}`}
      >
        <span className="inline-block">
          <RiChat1Line
            size={42}
            className="m-2"
            color={`${mode === "dark" ? "#fff" : "#000"}`}
          />
        </span>
        <span className="inline-block ml-2 font-semibold">ipsum</span>
      </div>

      <div>
        <RegisterComponent />
      </div>
    </main>
  );
};
