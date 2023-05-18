import { useContext } from "react";
import { Mode } from "../components/navbar";
import { ResetPasswordComponent } from "../components/resetPassword";

export const ResetPassword = () => {
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
        <ResetPasswordComponent />
      </div>
    </main>
  );
};
