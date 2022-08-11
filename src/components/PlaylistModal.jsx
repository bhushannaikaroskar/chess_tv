import React from "react";
import { useSelector } from "react-redux";
import AddPlaylistModal from "../pages/playlistpage/AddPlaylistModal";
import SelectPlaylistModal from "../pages/playlistpage/SelectPlaylistModal";

export default function PlaylistModal() {
    const { selectedVideo, createPlaylistModal, showPlaylistModal } =
        useSelector((state) => state.playlist);
    return (
        <>
            {showPlaylistModal && <SelectPlaylistModal video={selectedVideo} />}
            {createPlaylistModal && <AddPlaylistModal />}
        </>
    );
}
