import React from "react";
import { useHistory } from "../../context";
import VideoCard from "../videocard/VideoCard";
import "./historypage.css";

export default function HistoryPage() {
    const { history, clearHistory } = useHistory();

    return (
        <main className="grand-main">
            <div className="grand-history-content">
                <h2>Watch History</h2>
                <button className="btn btn-link-secondary" onClick={()=>clearHistory()}>Clear History</button>
            </div>
            <div className="grand-history-list">
                {[...history].reverse().map((video) => {
                    return <VideoCard video={video} />;
                })}
            </div>
        </main>
    );
}
