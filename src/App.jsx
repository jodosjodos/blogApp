


//files
import { Mode } from "./components/navbar";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Navbar } from "./components/navbar";
import { NotFound } from "./pages/notFound";
import { ForgotPassword } from "./pages/forgotPassword";
import { ResetPassword } from "./pages/resetPassword";

// react rouder dom
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// hooks

import { useState } from "react";
import { useSelector } from "react-redux";




function App() {
  const [mode, setMode] = useState("light")
 const {user}="jodos"
 const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)


  return (
    <Router>
     
     <Mode.Provider value={mode}>
     <Navbar mode={mode} setMode={setMode}/>
      <Routes>
       
        <Route element={ isLoggedIn?<Home />:<Navigate to="/login"/>} path="/" />
        <Route element={!user && !isLoggedIn?<Login />:<Navigate to="/"/>} path="/login" />
        <Route element={!user?<Register />:""} path="/register" />
        <Route element={<ForgotPassword />} path="/reset-password" />
        <Route element={<ResetPassword />} path="/forgot-password/:id/:token" />
        <Route element={<NotFound />} path="*" />
        
    
       
        
       
      </Routes>
     </Mode.Provider>
    </Router>
  );
}




export default App;
