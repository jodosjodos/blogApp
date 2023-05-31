
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Homepage } from './pages/Home/homePage';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ProfilePage } from './pages/profile/profilePage';
import { ForgotPassword } from './pages/forgotPassword';
import { ResetPassword } from './pages/resetPassword';
import  ArticleDetailPage  from './pages/Article/articleDetailPage';
import { NotFound } from './pages/notFound';

function App() {
  

  return (
    <div className="preflight">
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={ <Register />  } path="/register"/>
        <Route element={<ProfilePage />} path="/profile" />
        <Route element={<ForgotPassword />} path="/reset-password" />
        <Route element={<ResetPassword />} path="/forgot-password/:id/:token" />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
