import React from "react";
import { useWatchLater } from "../../context";
import VideoCard from "../videocard/VideoCard";
import "./watchlaterpage.css";

export default function WatchLaterPage() {
    const { watchLaterVideos } = useWatchLater();
    return (
        <main className="grand-main">
            <h2 className="p-y-1">Watch Later</h2>
            <div className="grand-watch-later-list">
                {watchLaterVideos.length > 0 ? (
                    watchLaterVideos.map((vid) => <VideoCard video={vid} />)
                ) : (
                    <div className=" font-large">
                        No videos found. Add some videos to watch later.
                    </div>
                )}
            </div>
        </main>
    );
}
