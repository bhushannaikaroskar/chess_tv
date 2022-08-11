import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Logo() {

    const {theme} = useSelector(state=>state.theme)

    return (
        <Link to="/" className="nav-logo">
            {theme === "light" ? <img src="/images/logo/light.png" alt="" />: <img src="/images/logo/dark.png" alt="" />}
        </Link>
    );
}
