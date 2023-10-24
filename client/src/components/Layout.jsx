import { Navigate, Outlet, useLocation } from "react-router-dom";

function Layout(){
    const user = null;
    const location= useLocation();

    return user?.token  ? (
        <Outlet/>
    ) : (
        <Navigate to = "/login" state={{from : location}} replaces />
    )
}

export default Layout