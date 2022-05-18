import React from "react";
import { VideoCard } from "../../components";
import { useHistory } from "../../context";
import "./historypage.css";

export default function HistoryPage() {
    const { history, clearHistory } = useHistory();

    return (
        <main className="grand-main">
            <div className="grand-history-content">
                <h2>Watch History</h2>
                {history.length !== 0 && (
                    <button
                        className="btn btn-link-secondary"
                        onClick={() => clearHistory()}
                    >
                        Clear History
                    </button>
                )}
            </div>
            <div className="grand-history-list">
                {[...history].reverse().map((video) => (
                    <VideoCard video={video} isHistoryPage={true}/>
                ))}
            </div>
        </main>
    );
}
