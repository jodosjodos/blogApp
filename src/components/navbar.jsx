import { createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import PropTypes from "prop-types"

export const Mode = createContext();

export const Navbar = ({ mode, setMode }) => {
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  const handleLogout=()=>{
    dispatch(dispatch(authActions.logout()))
    localStorage.removeItem("userCredentials")
    Navigate("/login");
    
  }
   
  return (
    <nav className="big grid grid-cols-2 gap-10">
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">register</Link>
   
      </div>
      <div>
        <p
          onClick={() =>
            setMode((prev) => (prev === "light" ? "dark" : "light"))
          }
        >
          {mode === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
        <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      
    </nav>
  );
};

Navbar.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};  