import { useSelector } from "react-redux";
import Footer from "./footer";
import { Navbar } from "./header";
import { RiChat1Line } from "react-icons/ri";
export const MainLayout = ({ children }) => {
  const mode = useSelector((state) => state.mode.mode);
  return (
    <div className="h-row-12 ">
      <div className=" w-col-12 flex flex-row items-center logo" style={{color:mode?"#279B00":"black"}}>
      <RiChat1Line
            size={42}
            className="m-2"
           
          />
        <p className="title ">
          RISEBLOG
        </p>
      </div>
      <div className="w-col-2 bg-[#050B03] h-row-12 borderPage">

      <Navbar />
      </div>
      <div className="w-col-10 bg-red-700">
      {children}

      </div>
      <div>

      <Footer />
      </div>
    </div>
  );
};
