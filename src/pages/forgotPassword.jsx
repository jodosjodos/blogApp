import { useContext } from "react";
import { Mode } from "../components/navbar";
import { ForgotPasswordComponent } from "../components/forgotPassword";

export const ForgotPassword = () => {
  const mode = useContext(Mode);
  return (
    <main
      className={`h-[100vh] w-full    flex flex-col  justify-center items-center ${
        mode === "dark" ? "darkPage" : "big"
      }`}
    >
      <div
        className={`flex items-center  ${mode === "dark" ? "logoDark" : ""}`}
      > 
       
      </div>

      <div>
        <ForgotPasswordComponent />
      </div>
    </main>
  );
};
