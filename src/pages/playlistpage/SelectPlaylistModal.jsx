import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPlaylist, removeFromPlaylist, setCreatePlaylistModal, setShowPlaylistModal } from "../../feature";
import "./playlistpage.css";

export default function SelectPlaylistModal({ video }) {
    const {playlist,createPlaylistModal, selectedVideo, showPlaylistModal} = useSelector(state=>state.playlist);
    const dispatch = useDispatch()

    const checkVideoPresent = (playlistObject,currVideo) => {
        return playlistObject.videos.find((vid) => vid._id === currVideo._id)?true:false
    }

    const togglePlaylistHandler = (playlistObject,currVideo)=>{
        if(checkVideoPresent(playlistObject,currVideo)){
            dispatch(removeFromPlaylist({playlistId:playlistObject._id,video:currVideo}))
        }else{
            dispatch(addToPlaylist({playlistId:playlistObject._id,video:currVideo}))
        }
    }

    return (
        <div className="playlist-modal-container">
            <div className="playlist-modal-card">
                <button
                    className="playlist-modal-close"
                    onClick={() => dispatch(setShowPlaylistModal({value:false}))}
                >
                    <span className="material-icons">close</span>
                </button>
                <h2 className="p-y-1">Add to Playlist</h2>
                <ul className="list ">
                    {playlist.map((obj) => {
                        return (
                            <li className="list-item playlist-checkbox-container">
                                <input
                                    id={obj._id}
                                    className="playlist-checkbox"
                                    type="checkbox"
                                    checked={checkVideoPresent(obj,video)}
                                    onChange={() => {togglePlaylistHandler(obj,video)}}
                                />
                                <label
                                    className="playlist-checkbox-label"
                                    htmlFor={obj._id}
                                >
                                    {" "}
                                    {obj.title}
                                </label>
                            </li>
                        );
                    })}
                </ul>
                <div className="p-1"></div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        dispatch(setCreatePlaylistModal({value:!createPlaylistModal}));
                    }}
                >
                    Create Playlist
                </button>
            </div>
        </div>
    );
}
