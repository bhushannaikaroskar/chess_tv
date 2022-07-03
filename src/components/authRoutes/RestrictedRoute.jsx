import React from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, useTheme } from "../../context";
import { errorToast } from "../../utils";

export default function RestrictedRoute() {
    const { auth } = useAuth();
    const { theme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        if (!auth.isAuthenticated && location.state.from.pathname) {
            errorToast("Login to access all features", theme);
        }
    }, [location]);

    return auth.isAuthenticated ? (
        <Navigate to={location?.state?.from?.pathname ?? "/"} replace />
    ) : (
        <Outlet />
    );
}
