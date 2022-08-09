import React from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, useTheme } from "../../context";
import { useSelector } from "react-redux";
import { errorToast } from "../../utils";

export default function RestrictedRoute() {
    // const { auth } = useAuth();
    const auth = useSelector((state)=> state.auth)
    const { theme } = useSelector((state)=>state.theme);
    const location = useLocation();

    useEffect(() => {
        if (!auth.isAuthenticated && location?.state?.from?.pathname && !location?.state?.isLogin) {
            errorToast("Login to access all features", theme);
        }
    }, [location]);

    return auth.isAuthenticated ? (
        <Navigate to={location?.state?.from?.pathname ?? "/"} replace />
    ) : (
        <Outlet />
    );
}
