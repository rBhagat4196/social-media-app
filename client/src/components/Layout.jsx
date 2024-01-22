import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const {user} = useSelector((state) => state.user)
  const location = useLocation()
  // console.log(user)
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replaces />
  )
}

export default Layout
