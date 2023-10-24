import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"


function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element= {<HomePage/>}/>
          <Route path="/profile/:id?" element={<ProfilePage/>}/>
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
      </Routes>
    </>
  )
}

export default App
