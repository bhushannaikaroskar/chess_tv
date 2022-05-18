import React, { useState } from "react";
import { usePlaylist, useVideos } from "../../context";
import AddPlaylistModal from "../playlistpage/AddPlaylistModal";
import SelectPlaylistModal from "../playlistpage/SelectPlaylistModal";
import VideoCard from "../videocard/VideoCard";
import "./explorepage.css";

export default function ExplorePage() {

    const {videoState,videoFilter,dispatchVideos} = useVideos();
    const {createPlaylistModal,showPlaylistModal} = usePlaylist();
    const [selectedVideo,setSelectedVideo] = useState(null);

    return (
        <main className="grand-main">
            <div className="grand-tags">
                <button className={`grand-tag ${Object.values(videoState.filters).every(value => !value)?"grand-tag-active":""}`} onClick={()=>{dispatchVideos({type:"RESET_FILTERS"})}}>
                    <div className="font-black">All</div>
                </button>
                <button className={`grand-tag ${videoState.filters.learn?"grand-tag-active":""}`} onClick={()=>{dispatchVideos({type:"TOGGLE_FILTERS",payload:{key:"learn"}})}}>
                    <div className="font-black">learn</div>
                </button>
                <button className={`grand-tag ${videoState.filters.openings?"grand-tag-active":""}`} onClick={()=>{dispatchVideos({type:"TOGGLE_FILTERS",payload:{key:"openings"}})}}>
                    <div className="font-black">Chess openings</div>
                </button>
                <button className={`grand-tag ${videoState.filters.tournament?"grand-tag-active":""}`} onClick={()=>{dispatchVideos({type:"TOGGLE_FILTERS",payload:{key:"tournament"}})}}>
                    <div className="font-black">tournaments</div>
                </button>
                <button className={`grand-tag ${videoState.filters.advanced?"grand-tag-active":""}`} onClick={()=>{dispatchVideos({type:"TOGGLE_FILTERS",payload:{key:"advanced"}})}}>
                    <div className="font-black">advanced chess</div>
                </button>
            </div>
            <div className="grand-video-list">
                {videoFilter(videoState).map((video)=>{
                    return <VideoCard video={video} setVideo={setSelectedVideo}/>
                })}
            </div>
            
            {showPlaylistModal && <SelectPlaylistModal video={selectedVideo}/>}
            {createPlaylistModal && <AddPlaylistModal/>}
        </main>
    );
}
