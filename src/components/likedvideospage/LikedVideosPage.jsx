import React from "react";
import { useLikes } from "../../context";
import VideoCard from "../videocard/VideoCard";
import "./likedvideopage.css";

export default function LikedVideosPage() {
    const { likedVideos } = useLikes();

    return (
        <main className="grand-main">
            <h2 className="p-y-1">Liked Videos:</h2>
            <div className="grand-liked-video-list">
                {likedVideos.length!==0?likedVideos.map((video) => {
                    return <VideoCard video={video} />;
                }): <div className=" font-large">No videos found. Add some videos to watch later.</div> }
            </div>
        </main>
    );
}
