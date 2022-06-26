import React from "react";
import { usePlaylist } from "../../context";
import "./playlistpage.css";

export default function SelectPlaylistModal({ video }) {
    const { playlist, setShowPlaylistModal, setCreatePlaylistModal,addToPlaylist,removeFromPlaylist } = usePlaylist();

    const checkVideoPresent = (playlistObject,currVideo) => {
        return playlistObject.videos.find((vid) => vid._id === currVideo._id)
    }

    const togglePlaylistHandler = (playlistObject,currVideo)=>{
        if(checkVideoPresent(playlistObject,currVideo)){
            removeFromPlaylist(playlistObject._id,currVideo)
        }else{
            addToPlaylist(playlistObject._id,currVideo)
        }
    }

    return (
        <div className="playlist-modal-container">
            <div className="playlist-modal-card">
                <button
                    className="playlist-modal-close"
                    onClick={() => setShowPlaylistModal(false)}
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
                                    checked={obj.videos.find(
                                        (vid) => vid._id === video._id
                                    )}
                                    onClick={() => {togglePlaylistHandler(obj,video)}}
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
                        setCreatePlaylistModal((s) => !s);
                    }}
                >
                    Create Playlist
                </button>
            </div>
        </div>
    );
}
