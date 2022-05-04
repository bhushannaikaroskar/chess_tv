import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" className="nav-logo">
            <img src="/images/logo/light.png" alt="" />
        </Link>
    );
}
