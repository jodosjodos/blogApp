
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
// import { Navbar } from "./components/navbar";
import { NotFound } from "./pages/notFound";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import { Username } from "./components/username";
import { Password } from "./components/password";
import { Recovery } from "./components/recovery";
import { Reset } from "./components/reset";
import { Profile } from "./components/profile";


function App() {
  return (
    <Router>
      {/* not yet being implemented */}
      {/* <Navbar></Navbar> */}
      <Routes>
<Route element={<Home/>} path="/" />
<Route element={<NotFound/>} path="*"/>
<Route element={<Login/>} path="/login" />
<Route element={<Register/>} path="/register" />
<Route element={<Username/>} path="/username"/>
<Route element={<Password/>} path="/password"/>
<Route element={<Recovery/>} path="/recovery"/>
<Route element={<Reset/>} path="/reset"/>
<Route element={<Profile/>} path="/profile"/>

      </Routes>
    </Router>
  );
}

export default App;
