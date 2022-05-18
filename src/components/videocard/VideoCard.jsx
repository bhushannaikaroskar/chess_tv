import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useHistory, usePlaylist, useVideos, useWatchLater } from "../../context";
import "./videocard.css";
import { getViewString } from "../../utils";

export default function VideoCard({ video, isHistoryPage = false,setVideo=()=>{}, playlistId = false }) {
    const { _id, title, videoThumbnail, channelName, channelThumbNail, views } =
        video;
    const { modalId, toggleModal } = useVideos();
    const { watchLaterVideos, toggleWatchLater } = useWatchLater();
    const { removeFromHistory } = useHistory();
    const { removeFromPlaylist, setShowPlaylistModal} = usePlaylist()
    const navigate = useNavigate();
    const {auth} = useAuth()

    const isWatchLater = watchLaterVideos.find((vid) => vid._id === video._id);

    return (
        <div className="grand-video-card">
            <div
                className="grand-video-img-container"
            >
                {!isHistoryPage && (
                    <div className="grand-img-overlay"
                    onClick={() => navigate(`/video/${_id}`)}>
                        <span className="material-icons-round grand-btn-lg">
                            play_arrow
                        </span>
                        <h3>Play</h3>
                    </div>
                )}
                {isHistoryPage && (
                    <button className="grand-video-img-close" onClick={()=>removeFromHistory(video)}>
                        <span className="material-icons-round grand-btn-lg">
                            delete
                        </span>
                    </button>
                )}

                <img
                    className="grand-video-img"
                    src={videoThumbnail}
                    alt="thumbnail"
                />
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
                            {playlistId ? <button className="grand-video-options-button" onClick={()=>{
                                if(!auth.isAuthenticated){
                                    navigate("/login")
                                }
                                removeFromPlaylist(playlistId,video)
                                }}>
                                <span className="material-icons fw-400">
                                    playlist_play
                                </span>
                                Remove from Playlist
                            </button>:<button className="grand-video-options-button" onClick={()=>{
                                if(!auth.isAuthenticated){
                                    navigate("/login")
                                }
                                setVideo(video);
                                setShowPlaylistModal(s=>!s)}}>
                                <span className="material-icons fw-400">
                                    playlist_play
                                </span>
                                Add to Playlist
                            </button>}
                            <button
                                className="grand-video-options-button"
                                onClick={() => toggleWatchLater(video)}
                            >
                                <span className="material-icons">schedule</span>
                                {isWatchLater
                                    ? "Remove from Watch later"
                                    : "Add to Watch Later"}
                            </button>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
