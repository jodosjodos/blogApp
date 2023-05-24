
import { ForgotPasswordComponent } from "../components/forgotPassword";
import { useSelector } from "react-redux";

export const ForgotPassword = () => {
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
       
      </div>

      <div>
        <ForgotPasswordComponent />
      </div>
    </main>
  );
};
