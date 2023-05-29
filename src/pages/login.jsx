import { RiChat1Line } from "react-icons/ri";
import { LoginComponent } from "../components/loginComponent";

// import { Mode } from "../components/navbar";
import { useSelector } from "react-redux";

export const Login = () => {
  const mode = useSelector(state=>state.mode.mode)
console.log(mode);
  return (
    <main
      className={` h-[100vh] pb-28    flex flex-col   justify-center items-center ${
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
        <LoginComponent />
      </div>
    </main>
  );
};
