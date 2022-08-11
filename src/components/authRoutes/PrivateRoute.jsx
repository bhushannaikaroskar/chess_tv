import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
    const auth = useSelector((state)=> state.auth)
    const location  = useLocation();

    return (
        <>
            {auth.isAuthenticated ? (
                <Outlet />
            ) : (
                <Navigate to="/login" state={{from:location}}/>
            )}
        </>
    );
}
