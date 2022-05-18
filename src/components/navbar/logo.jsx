import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context";

export default function Logo() {

    const {theme} = useTheme()

    return (
        <Link to="/" className="nav-logo">
            {theme === "light" ? <img src="/images/logo/light.png" alt="" />: <img src="/images/logo/dark.png" alt="" />}
        </Link>
    );
}
