import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./Searchbar";
import Logo from "./logo";
import "./navbar.css"
import {AccountIcon, DarkModeIcon, LightModeIcon} from "../icons/icons"
import { useAuth, useTheme, useVideos } from "../../context";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchVideos, getHistory, getLikes, getPlaylists, getWatchLaterVideo, logout, resetFilters, resetHistory, resetLikes, resetPlaylist, resetWatchLater, setModalId, setSearchValue, toggleTheme, verifyUser } from "../../feature";


export default function NavBar({isVisible}) {

    // const { setSearchValue} = useVideos();
    // const {auth,logout} = useAuth();
    
    const auth = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const location = useLocation();
    // const {theme,toggle} = useTheme();
    const {theme} = useSelector((state)=>state.theme)

    useEffect(()=>{
        
        if(auth.isAuthenticated){
            dispatch(getLikes());
            dispatch(getHistory());
            dispatch(getPlaylists());
            dispatch(getWatchLaterVideo());
            
        }else{
            dispatch(resetLikes());
            dispatch(resetHistory());
            dispatch(resetPlaylist());
            dispatch(resetWatchLater());
        }
        // console.log("auth chnaged",auth)
    },[auth])

    useEffect(()=>{
        dispatch(setModalId({value:""}))
        if(location.pathname !== "/explore"){
            dispatch(resetFilters())
            dispatch(setSearchValue({searchValue:""}))
        }
    },[location])

    useEffect(()=>{
        dispatch(fetchVideos())
        if(localStorage.getItem("chess-token")){
            dispatch(verifyUser())
        }
    },[])
 
    useEffect(()=>{
        document.documentElement.setAttribute("data-theme", theme);
    },[theme])
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
                        className={`btn btn-link-secondary justify-content-start font-color-gray ${auth.isAuthenticated?"disable-events":""}`}
                        to="/login" 
                        state={{from:location,isLogin:true}}
                        onClick={()=>setSearchValue("")}
                    >
                        <AccountIcon />
                    </NavLink>

                    {auth.isAuthenticated && (
                        <div className="account-modal">
                            <button className="btn btn-link-secondary font-error" onClick={()=>dispatch(logout())}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                <button
                    id="toggle-theme"
                    className="btn btn-link-secondary justify-content-start font-medium  font-color-gray"
                    onClick={()=>dispatch(toggleTheme())}
                >
                    {theme === "light" ? <DarkModeIcon />:<LightModeIcon/>}
                </button>
                
            </div>
        </nav>
    );
}
