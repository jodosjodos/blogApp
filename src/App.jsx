//files

import { Login } from "./pages/login";
import { Register } from "./pages/register";
// import { Home } from "./pages/home";
import { NotFound } from "./pages/notFound";
import { ForgotPassword } from "./pages/forgotPassword";
import { ResetPassword } from "./pages/resetPassword";
import { Homepage } from "./pages/Home/homePage";

// react rouder dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// hooks

import { useSelector } from "react-redux";
import ArticleDetailPage from "./pages/Article/articleDetailPage";

function App() {
  const { user } = "jodos";
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

 
  return (
    <div className=" preflight">
    <Router>
      <Routes>
        {/* <Route
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          path="/"
        /> */}

        <Route
          element={isLoggedIn ? <Homepage /> : <Navigate to="/login" />}
          path="/"
        />

        <Route
          element={!user && !isLoggedIn ? <Login /> : <Navigate to="/" />}
          path="/login"
        />
        <Route element={!user ? <Register /> : ""} path="/register" />
        <Route element={<ForgotPassword />} path="/reset-password" />
        <Route element={<ResetPassword />} path="/forgot-password/:id/:token" />

        {/* fronted from login */}
        <Route  path="/blog/:id" element={<ArticleDetailPage/>}/>
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
    </div>
   
  );
}

export default App;
