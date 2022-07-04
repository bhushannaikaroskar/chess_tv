import React, { useState } from "react";
import { usePlaylist, useVideos } from "../../context";
import { VideoCard } from "../../components";
import "./explorepage.css";
import AddPlaylistModal from "../playlistpage/AddPlaylistModal";
import SelectPlaylistModal from "../playlistpage/SelectPlaylistModal";
import { useDocumentTitle } from "../../utils";

export default function ExplorePage() {

    const {videoState,videoFilter,dispatchVideos,searchValue} = useVideos();
    const {createPlaylistModal,showPlaylistModal} = usePlaylist();
    const [selectedVideo,setSelectedVideo] = useState(null);
    useDocumentTitle("Explore")

    const videoList = videoFilter(videoState);

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
            {searchValue  && <div className="font-normal">Showing results for {<b className="font-large">{searchValue}</b>}</div>}
            <div className="grand-video-list">
                {videoList.map((video)=>{
                    return <VideoCard video={video} setVideo={setSelectedVideo}/>
                })}
                {videoList.length === 0 && <div className="grand-empty">
                        {/* <img className="grand-empty-img" src="/images/search_result.png" alt="" /> */}
                        <div className=" font-x-large">
                            Search not found.
                        </div>
                    </div>}
            </div>
            
            {showPlaylistModal && <SelectPlaylistModal video={selectedVideo}/>}
            {createPlaylistModal && <AddPlaylistModal/>}
        </main>
    );
}
