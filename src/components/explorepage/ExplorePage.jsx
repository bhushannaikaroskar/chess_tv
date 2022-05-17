import React, { useState } from "react";
import { usePlaylist, useVideos } from "../../context";
import AddPlaylistModal from "../playlistpage/AddPlaylistModal";
import SelectPlaylistModal from "../playlistpage/SelectPlaylistModal";
import VideoCard from "../videocard/VideoCard";
import "./explorepage.css";

export default function ExplorePage() {

    const {videoState} = useVideos();
    const {createPlaylistModal,showPlaylistModal} = usePlaylist();
    const [selectedVideo,setSelectedVideo] = useState(null);

    return (
        <main className="grand-main">
            <div className="grand-tags">
                <button className="grand-tag">
                    <div className="font-black">All</div>
                </button>
                <button className="grand-tag">
                    <div className="font-black">learn</div>
                </button>
                <button className="grand-tag">
                    <div className="font-black">Chess openings</div>
                </button>
                <button className="grand-tag">
                    <div className="font-black">tournaments</div>
                </button>
                <button className="grand-tag">
                    <div className="font-black">advanced chess</div>
                </button>
            </div>
            <div className="grand-video-list">
                {videoState.videos.map((video)=>{
                    return <VideoCard video={video} setVideo={setSelectedVideo}/>
                })}
            </div>
            
            {showPlaylistModal && <SelectPlaylistModal video={selectedVideo}/>}
            {createPlaylistModal && <AddPlaylistModal/>}
        </main>
    );
}
