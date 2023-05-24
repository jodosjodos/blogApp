
import { ResetPasswordComponent } from "../components/resetPassword";
import { useSelector } from "react-redux";

export const ResetPassword = () => {
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
        <ResetPasswordComponent />
      </div>
    </main>
  );
};
