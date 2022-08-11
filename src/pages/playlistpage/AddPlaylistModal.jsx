import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist, setCreatePlaylistModal } from "../../feature";
import "./playlistpage.css";

export default function AddPlaylistModal() {
    const {createPlaylistModal} = useSelector(state => state.playlist)
    const dispatch = useDispatch();
    const [playlistObject, setPlaylistObject] = useState({
        title: "",
        description: "",
        titleError: false,
        descriptionError: false,
    });

    const inputHandler = (event, key) => {
        setPlaylistObject((s) => ({ ...s, [key]: event.target.value }));
    };

    const submitHandler = () => {
        if (playlistObject.title.trim() === "") {
            setPlaylistObject((s) => ({ ...s, titleError: true }));
            return;
        } else {
            setPlaylistObject((s) => ({ ...s, titleError: false }));
        }

        if (playlistObject.description.trim() === "") {
            setPlaylistObject((s) => ({ ...s, descriptionError: true }));
            return;
        } else {
            setPlaylistObject((s) => ({ ...s, descriptionError: false }));
        }

        dispatch(addPlaylist({
            title:playlistObject.title.trim(),
            description:playlistObject.description.trim()}
        ));
        dispatch(setCreatePlaylistModal({value:!createPlaylistModal}))
    };

    return (
        <div className="playlist-modal-container">
            <div className="playlist-modal-card">
                <button
                    className="playlist-modal-close"
                    onClick={() => dispatch(setCreatePlaylistModal({value:false}))}
                >
                    <span className="material-icons">close</span>
                </button>
                <h2 className="p-y-1">New Playlist</h2>
                <div className="input-wrapper">
                    <label htmlFor="title" className="input-label">
                        Title:
                    </label>
                    <input
                        id="title"
                        type="text"
                        className={`input-field ${playlistObject.titleError?"input-color-error":""}`} 
                        onChange={(e) => inputHandler(e, "title")}
                    />
                    {playlistObject.titleError && <span class="input-message">Enter title of playlist</span>}
                </div>
                <div className="input-wrapper p-y-1">
                    <label htmlFor="description" className="input-label">
                        Description:
                    </label>
                    <input
                        id="description"
                        type="text"
                        className={`input-field ${playlistObject.descriptionError?"input-color-error":""}`} 
                        onChange={(e) => inputHandler(e, "description")}
                    />
                    {playlistObject.descriptionError && <span class="input-message">Enter description</span>}
                </div>
                <div className="p-1"></div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        submitHandler();
                    }}
                >
                    Create Playlist
                </button>
            </div>
        </div>
    );
}
