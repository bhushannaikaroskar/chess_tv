import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./videocard.css";
import { getViewString,getDateDifferenceString } from "../../utils";
import { removeFromHistory, removeFromPlaylist, setSelectedVideo, setShowPlaylistModal, toggleModal, toggleWatchLater } from "../../feature";

export default function VideoCard({ video, isHistoryPage = false, playlistId = false }) {
    const { _id, title, videoThumbnail, channelName, channelThumbNail, date, views } =
        video;
    const {modalId} = useSelector(state => state.video)
    const {watchLaterVideos} = useSelector(state => state.watchlater)
    const {showPlaylistModal} = useSelector(state=>state.playlist)
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

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
                    <button className="grand-video-img-close" onClick={()=>dispatch(removeFromHistory({video}))}>
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
                    )} views . ${getDateDifferenceString(date)}`}</div>
                </div>
                <button
                    className="grand-video-card-btn"
                    onClick={() => dispatch(toggleModal({videoId:_id}))}
                >
                    <span className="material-icons ">more_vert</span>
                    {modalId === _id && (
                        <div className="grand-video-options-modal">
                            {playlistId ? (<button className="grand-video-options-button" onClick={()=>{
                                if(!auth.isAuthenticated){
                                    navigate("/login")
                                    return;
                                }
                                dispatch(removeFromPlaylist({playlistId,video}))
                                }}>
                                <span className="material-icons fw-400">
                                    playlist_play
                                </span>
                                Remove from Playlist
                            </button>):(<button className="grand-video-options-button" onClick={()=>{
                                if(!auth.isAuthenticated){
                                    navigate("/login",{state:{from:location}})
                                    return;
                                }
                                dispatch(setSelectedVideo({video}));
                                dispatch(setShowPlaylistModal({value:!showPlaylistModal}))}}>
                                <span className="material-icons fw-400">
                                    playlist_play
                                </span>
                                Add to Playlist
                            </button>)}
                            <button
                                className="grand-video-options-button"
                                onClick={() => {
                                    if(!auth.isAuthenticated){
                                        navigate("/login",{state:{from:location}})
                                        return
                                    }
                                    dispatch(toggleWatchLater({video}))

                                }}
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
