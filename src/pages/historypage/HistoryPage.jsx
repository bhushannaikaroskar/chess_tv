import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { VideoCard } from "../../components";
import { clearHistory } from "../../feature";
import { useDocumentTitle } from "../../utils";
import "./historypage.css";

export default function HistoryPage() {
    const {history} = useSelector((state)=>state.history);
    const dispatch = useDispatch()
    useDocumentTitle("History")

    return (
        <main className="grand-main">
            <div className="grand-history-content">
                <h2>Watch History</h2>
                {history.length !== 0 && (
                    <button
                        className="btn btn-link-secondary"
                        onClick={() => dispatch(clearHistory())}
                    >
                        Clear History
                    </button>
                )}
            </div>
            <div className="grand-history-list">
                {[...history].reverse().map((video) => (
                    <VideoCard video={video} isHistoryPage={true}/>
                ))}
                {history.length === 0  && <div className="font-large">No videos in History</div>}
            </div>
        </main>
    );
}
