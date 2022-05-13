import React from "react";
import { useNavigate } from "react-router-dom";
import { useVideos } from "../../context";
import "./videocard.css";

const getViewString = (views) => {
    let viewCount = "";
    let viewSymbol = "";
    if (views > 1000000) {
        viewSymbol = "M";
        views = views / 1000000;
        if (views > 10) {
            views = "" + views;
            viewCount = views.substring(0, 2);
        } else {
            views = "" + views;
            viewCount = views.substring(0, 3);
        }
    } else if (views > 1000) {
        viewSymbol = "K";
        views = views / 1000;
        if (views > 10 && views < 100) {
            views = "" + views;
            viewCount = views.substring(0, 2);
        } else {
            views = "" + views;
            viewCount = views.substring(0, 3);
        }
    } else {
        viewCount = "" + views;
    }

    return viewCount + viewSymbol;
};

export default function VideoCard({ video }) {
    const { _id, title, videoThumbnail, channelName, channelThumbNail, views } =
        video;
    const { modalId, toggleModal } = useVideos();
    const navigate = useNavigate();

    return (
        <div className="grand-video-card">
            <div
                className="grand-video-img-container"
                onClick={() => navigate(`/video/${_id}`)}
            >
                <div className="grand-img-overlay">
                    <span className="material-icons-round grand-btn-lg">
                        play_arrow
                    </span>
                    <h3>Play</h3>
                </div>
                <img className="grand-video-img" src={videoThumbnail} alt="" />
            </div>
            <div className="grand-content-wrapper">
                <div className="grand-channel-img-wrapper">
                    <img
                        className="grand-channel-img"
                        src={channelThumbNail}
                        alt=""
                    />
                </div>
                <div className="grand-content">
                    <div className="grand-card-title">{title}</div>
                    <div className="grand-channel-name">{channelName}</div>
                    <div className="grand-channel-name">{`${getViewString(
                        views
                    )} views . 8 months ago`}</div>
                </div>
                <button
                    className="grand-video-card-btn"
                    onClick={() => toggleModal(_id)}
                >
                    <span className="material-icons ">more_vert</span>
                    {modalId === _id && (
                        <div className="grand-video-options-modal">
                            <button className="grand-video-options-button">
                                <span class="material-icons fw-400">
                                    playlist_play
                                </span>
                                Add to Playlist
                            </button>
                            <button className="grand-video-options-button">
                                <span class="material-icons">schedule</span>
                                Add to Watch Later
                            </button>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
