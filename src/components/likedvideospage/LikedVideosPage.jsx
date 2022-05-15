import React from "react";
import { useLikes } from "../../context";
import VideoCard from "../videocard/VideoCard";
import "./likedvideopage.css"

export default function LikedVideosPage() {

    const {likedVideos} = useLikes()

    return <div className="grand-main">
        <h2 className="p-y-1">Liked Videos:</h2>
        <div className="grand-liked-video-list">
        {likedVideos.map((video)=>{
            return <VideoCard video={video}/>
        })}
        </div>
    </div>;
}
