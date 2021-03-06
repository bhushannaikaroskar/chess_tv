import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoCard } from "../../components";
import { useAuth, useHistory, useLikes, usePlaylist, useVideos, useWatchLater } from "../../context";
import { getSubscribersString, getViewString } from "../../utils";
import AddPlaylistModal from "../playlistpage/AddPlaylistModal";
import SelectPlaylistModal from "../playlistpage/SelectPlaylistModal";
import "./videopage.css";

export default function VideoPage() {
    const { videoId } = useParams();
    const { videoState } = useVideos();
    const { likedVideos, toggleLike } = useLikes()
    const { auth } = useAuth();
    const { history, addToHistory, removeFromHistory } = useHistory();
    const {watchLaterVideos,toggleWatchLater } = useWatchLater()
    const { showPlaylistModal, createPlaylistModal,setShowPlaylistModal} = usePlaylist()

    const currentVideo = videoState.videos.find(
        (video) => video._id === videoId
    );

    const isLiked = likedVideos.find(vid => vid._id === currentVideo._id)
    const isWatchLater = watchLaterVideos.find(vid => vid._id === currentVideo._id)

    const handleHistory = async ()=>{
        if(auth.isAuthenticated){
            // removes history video to add it to recently watched
            if(history.find( vid => vid._id === currentVideo._id)){
                await removeFromHistory(currentVideo);
            }   
            await addToHistory(currentVideo)
        }
    }

    useEffect(()=>{
        handleHistory()
    },[videoId])

    return (
        <main className="grand-main">
            {currentVideo ? (
                <div className="grand-video-grid">
                    <div className="grand-video-content-wrapper">
                        <iframe
                            title={currentVideo.title}
                            className="grand-video-container"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            allow="autoplay;"
                            frameBorder={0}
                        ></iframe>
                        <div className="grand-video-title">
                            {currentVideo.title}
                        </div>
                        <div className="grand-video-content">
                            <div className="grand-video-views">
                                {`${currentVideo.views} views . ${currentVideo.date}`}
                            </div>
                            <div className="grand-video-cta">
                                <div className="grand-item">
                                    <button className="grand-video-btn" onClick={()=>toggleLike(currentVideo)}>
                                        <span className={`material-icons ${isLiked?"font-primary":""}`}>
                                            thumb_up
                                        </span>
                                    </button>
                                    {getViewString(currentVideo.likes + (isLiked?1:0))}
                                </div>
                                <div className="grand-item">
                                    <button className="grand-video-btn" onClick={()=>toggleWatchLater(currentVideo)}>
                                        <span className={`material-icons ${isWatchLater?"font-primary":""}`}>
                                            schedule
                                        </span>
                                    </button>
                                    Watch Later
                                </div>
                                <div className="grand-item">
                                    <button className="grand-video-btn" onClick={()=>{setShowPlaylistModal(s=>!s)}}>
                                        <span className="material-icons">
                                            playlist_play
                                        </span>
                                    </button>
                                    Save
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="grand-video-channel-container">
                            <img src={currentVideo.channelThumbNail} alt="channel thumbnail" className="grand-video-channel-img" />
                            <div className="grand-video-channel-content">
                                <div className="grand-video-channel-title">{currentVideo.channelName}</div>
                                <div className="grand-video-channel-subscribers">{getSubscribersString(currentVideo.subscribers)} subscribers</div>
                            </div>
                        </div>
                        <div className="grand-video-description">
                            {currentVideo.description.map((para)=>{
                                return <p>{para}</p>
                            })}
                        </div>

                    </div>
                    <div className="grand-suggestions-list">
                        <div className="suggestions-title">Similar Videos:</div>
                        {videoState.videos
                            .filter(
                                (vid) =>
                                    vid._id !== videoId &&
                                    currentVideo.category === vid.category
                            )
                            .map((vid) => {
                                return <VideoCard key={vid._id} video={vid} />;
                            })}
                    </div>
                </div>
            ) : (
                "Loading Video"
            )}
            
            {showPlaylistModal && <SelectPlaylistModal video={currentVideo}/>}
            {createPlaylistModal && <AddPlaylistModal/>}
        </main>
    );
}
