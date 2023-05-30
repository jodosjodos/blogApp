import { useSelector } from "react-redux";
import { RiChat1Line } from "react-icons/ri";
import PropTypes from "prop-types"

import { Navbar } from "./header";
import Footer from "./footer";
export const MainLayout = ({ children }) => {
  const mode = useSelector((state) => state.mode.mode);
  const isNavVisible=useSelector((state)=>state.navVisibility.navVisibility)
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
      <div className= "w-col-2 bg-[#050B03] max-h-full borderPage  relative">

      <Navbar  />
      </div>
      <div className={`w-col-10 ${isNavVisible?"hidden":""} lg:block `}>
      {children}

      </div>
      <div>

      <Footer />
      </div>
    </div>
  );
};
MainLayout.propTypes={
  children:PropTypes.any
}