import React from "react";
import { useSelector } from "react-redux";
import { VideoCard } from "../../components";
import { useDocumentTitle } from "../../utils";
import "./likedvideopage.css";

export default function LikedVideosPage() {
    const {likedVideos} = useSelector((state)=>state.like);
    useDocumentTitle("Liked Videos");

    return (
        <main className="grand-main">
            <h2 className="p-y-1">Liked Videos:</h2>
            <div className="grand-liked-video-list">
                {likedVideos.map((video) => {
                    return <VideoCard video={video} />;
                })}
            </div>
            {likedVideos.length === 0 && (
                <div className="grand-liked-video-empty">
                    <div className="grand-empty">
                        <img
                            className="grand-empty-img"
                            src="/images/spaceship.png"
                            alt="No video Found"
                        />
                        <div className=" font-x-large">
                            No videos found. Like some videos.
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
