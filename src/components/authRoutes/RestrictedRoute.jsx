import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context";

export default function RestrictedRoute() {
    const { auth } = useAuth();
    const location = useLocation();

    return auth.isAuthenticated ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
}
