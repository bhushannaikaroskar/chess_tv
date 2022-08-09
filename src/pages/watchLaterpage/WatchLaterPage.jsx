import React from "react";
import { useSelector } from "react-redux";
import { VideoCard } from "../../components";
import { useWatchLater } from "../../context";
import { useDocumentTitle } from "../../utils";
import "./watchlaterpage.css";

export default function WatchLaterPage() {
    // const { watchLaterVideos } = useWatchLater();
    const {watchLaterVideos} = useSelector(state => state.watchlater);
    useDocumentTitle("Watch Later");

    return (
        <main className="grand-main">
            <h2 className="p-y-1">Watch Later:</h2>
            <div className="grand-watch-later-list">
                {watchLaterVideos.map((vid) => (
                    <VideoCard video={vid} />
                ))}
            </div>
            {watchLaterVideos.length === 0 && (
                <div className="grand-watch-later-empty">
                    <div className="grand-empty">
                        <img
                            className="grand-empty-img"
                            src="/images/spaceship.png"
                            alt=""
                        />
                        <div className=" font-x-large">
                            No videos found. Add some videos to watch later.
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
