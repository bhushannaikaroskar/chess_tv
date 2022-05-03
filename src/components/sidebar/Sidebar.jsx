import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {

    const navigate = useNavigate()

    return (
        <aside className="grand-filter sidebar sidebar-hidden p-y-2">
            <button className="btn-nav" onClick={()=>{navigate('/')}}>
                <span class="material-icons-outlined">home</span>Home
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/explore')}}>
                <span class="material-icons-outlined">explore</span>Explore
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/playlist')}}>
                <span class="material-icons">playlist_play</span>Playlist
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/liked_videos')}}>
                <span class="material-icons-outlined">thumb_up</span>Liked Videos
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/watch_later')}}>
                <span class="material-icons">schedule</span>Watch Later
            </button>
            <button className="btn-nav" onClick={()=>{navigate('/history')}}>
                <span class="material-icons">history</span>History
            </button>
        </aside>
    );
}
