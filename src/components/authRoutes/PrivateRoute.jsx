import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
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
