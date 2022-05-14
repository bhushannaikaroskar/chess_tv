import React from "react";
import { useVideos } from "../../context";
import VideoCard from "../videocard/VideoCard";
import "./explorepage.css";

export default function ExplorePage() {

    const {videoState,videosDispatch} = useVideos();

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
                    return <VideoCard video={video} />
                })}
            </div>
        </main>
    );
}
