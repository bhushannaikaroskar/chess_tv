import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

export default function PrivateRoute() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const redirect = () => {
        navigate("../login");
    };

    useEffect(() => {
        if (!auth.isAuthenticated) {
            redirect();
        }
    });

    return (
        <>
            {auth.isAuthenticated ? (
                <Outlet />
            ) : (
                <div>Private route accessed denied</div>
            )}
        </>
    );
}
