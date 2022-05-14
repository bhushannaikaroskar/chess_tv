import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {

    const navigate = useNavigate()

    return (
        <aside className="grand-filter sidebar sidebar-hidden p-y-2">
            <button className="btn-nav" onClick={()=>{navigate('/')}}>
                <span className="material-icons-outlined">home</span>Home
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/explore')}}>
                <span className="material-icons-outlined">explore</span>Explore
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/playlist')}}>
                <span className="material-icons">playlist_play</span>Playlist
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/liked_videos')}}>
                <span className="material-icons-outlined">thumb_up</span>Liked Videos
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/watch_later')}}>
                <span className="material-icons">schedule</span>Watch Later
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/history')}}>
                <span className="material-icons">history</span>History
            </button>
        </aside>
    );
}
