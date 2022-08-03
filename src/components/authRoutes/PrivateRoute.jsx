import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
    // const { auth } = useAuth();
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
