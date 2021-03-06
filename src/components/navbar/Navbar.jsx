import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./Searchbar";
import Logo from "./logo";
import "./navbar.css"
import {AccountIcon, DarkModeIcon, LightModeIcon} from "../icons/icons"
import { useAuth, useTheme, useVideos } from "../../context";


export default function NavBar({isVisible}) {

    const { setSearchValue} = useVideos();
    const {auth,logout} = useAuth();
    const {theme,toggle} = useTheme();
 
    return (
        <nav className={"grand-nav navbar navbar-responsive box-shadow-100 p-2_5 p-y-1 " + (isVisible?"grand-nav-absolute":"") }>
            <Logo />
            <SearchBar/>
            <div className="nav-items">
                <NavLink
                    className="btn btn-link-secondary justify-content-start font-color-gray"
                    to="/wishlist"
                    onClick={()=>setSearchValue("")}
                >
                    <div className="badge-container flex flex-column">
                        
                    </div>
                </NavLink>
                <div className="badge-container account flex flex-column">
                    <NavLink
                        className="btn btn-link-secondary justify-content-start font-color-gray"
                        to="/login"
                        onClick={()=>setSearchValue("")}
                    >
                        <AccountIcon />
                    </NavLink>

                    {auth.isAuthenticated && (
                        <div className="account-modal">
                            <button className="btn btn-link-secondary font-error" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                <button
                    id="toggle-theme"
                    className="btn btn-link-secondary justify-content-start font-medium  font-color-gray"
                    onClick={toggle}
                >
                    {theme === "light" ? <DarkModeIcon />:<LightModeIcon/>}
                </button>
                
            </div>
        </nav>
    );
}
