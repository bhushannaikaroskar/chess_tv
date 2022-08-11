import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";

const navigations = [
    {
        name:"Home",
        pathname:"/",
        icon:"home",
        isOutlined:true
    },
    {
        name:"Explore",
        pathname:"/explore",
        icon:"explore",
        isOutlined:true
    },
    {
        name:"Playlist",
        pathname:"/playlist",
        icon:"playlist_play",
        isOutlined:false
    },
    {
        name:"Liked Videos",
        pathname:"/liked_videos",
        icon:"thumb_up",
        isOutlined:true
    },
    {
        name:"Watch Later",
        pathname:"/watch_later",
        icon:"schedule",
        isOutlined:false
    },
    {
        name:"History",
        pathname:"/history",
        icon:"history",
        isOutlined:false
    },
]

export default function Sidebar() {

    const navigate = useNavigate()
    const location = useLocation();

    return (
        <aside className="grand-filter sidebar sidebar-hidden p-y-2">
        {navigations.map((nav)=>{
            const isActive = location.pathname === nav.pathname || (location.pathname.includes("/video") && nav.pathname === "/explore")?"btn-nav-active":""
            return (
                <button key={nav.icon} className={`btn-nav ${isActive}`} onClick={()=>{navigate(nav.pathname)}}>
                    <span className={`material-icons${nav.isOutlined?"-outlined":""}`}>{nav.icon}</span>
                    <div className="btn-nav-text">{nav.name}</div>
                </button>
            )
        })} 
        </aside>
    );
}
