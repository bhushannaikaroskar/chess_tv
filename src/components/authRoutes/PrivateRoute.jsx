import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context";

export default function PrivateRoute() {
    const { auth } = useAuth();
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
