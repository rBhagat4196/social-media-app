import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useSelector } from "react-redux";
import RegisterPage  from "./pages/RegisterPage";

function App() {
  const { theme } = useSelector((state) => state.theme);
  // console.log(theme)
  return (
    <>
      <div data-theme={theme} className="w-full min-h-[100vh]">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id?" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
