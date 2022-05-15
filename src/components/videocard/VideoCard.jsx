import React from "react";
import { useNavigate } from "react-router-dom";
import { useVideos } from "../../context";
import "./videocard.css";
import { getViewString } from "../../utils";



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
                <img className="grand-video-img" src={videoThumbnail} alt="thumbnail" />
            </div>
            <div className="grand-content-wrapper">
                <div className="grand-channel-img-wrapper">
                    <img
                        className="grand-channel-img"
                        src={channelThumbNail}
                        alt="channel-thumbnail"
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
                                <span className="material-icons fw-400">
                                    playlist_play
                                </span>
                                Add to Playlist
                            </button>
                            <button className="grand-video-options-button">
                                <span className="material-icons">schedule</span>
                                Add to Watch Later
                            </button>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
