import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./Searchbar";
import Logo from "./logo";
import "./navbar.css"
import {AccountIcon, DarkModeIcon} from "../icons/icons"


export default function NavBar({isVisible}) {
 
    return (
        <nav className={"grand-nav navbar navbar-responsive box-shadow-100 p-2_5 p-y-1 " + (isVisible?"grand-nav-absolute":"") }>
            <Logo />
            <SearchBar/>
            <div className="nav-items">
                <NavLink
                    className="btn btn-link-secondary justify-content-start font-color-gray"
                    to="/wishlist"
                    // onClick={()=>setSearchValue("")}
                >
                    <div className="badge-container flex flex-column">
                        
                    </div>
                </NavLink>
                <div className="badge-container account flex flex-column">
                    <NavLink
                        className="btn btn-link-secondary justify-content-start font-color-gray"
                        to="/login"
                        // onClick={()=>setSearchValue("")}
                    >
                        <AccountIcon />
                    </NavLink>

                    {/* {auth.isAuthenticated && (
                        <div className="account-modal">
                            <Link className="btn btn-link-secondary" to="/profile"> Profile </Link>
                            <button className="btn btn-link-secondary font-error" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    )} */}
                </div>
                <button
                    id="toggle-theme"
                    className="btn btn-link-secondary justify-content-start font-medium  font-color-gray"
                >
                    {/* {theme === "light" ? <DarkModeIcon />:<LightModeIcon/>} */}
                    <DarkModeIcon/>
                </button>
                
            </div>
        </nav>
    );
}