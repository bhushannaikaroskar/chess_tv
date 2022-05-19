import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { errorToast, successToast } from "../utils";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";

const PlaylistContext = createContext();

export default function PlaylistProvider({ children }) {
    const [playlist, setPlaylist] = useState([]);
    const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const { auth } = useAuth();
    const {theme} = useTheme();

    const getPlaylists = () => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "get",
                url: "/api/user/playlists",
                headers: { authorization: auth.authToken },
                data: {},
            })
            .then((res) => {
                console.log(res.data.playlists);
                setPlaylist([...res.data.playlists]);
            })
            .catch((err) => {
                errorToast("Some error while fetching playlist",theme)
            });
    };

    const addPlaylist = (title, description) => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "post",
                url: "/api/user/playlists",
                headers: { authorization: auth.authToken },
                data: {
                    playlist: {
                        title,
                        description,
                    },
                },
            })
            .then((res) => {
                successToast("Added Playlist",theme)
                setPlaylist([...res.data.playlists]);
            })
            .catch((err) => {
                errorToast("Some error while adding Playlist",theme)
            });
    };

    const removePlaylist = (playlistId) => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "delete",
                url: `/api/user/playlists/${playlistId}`,
                headers: { authorization: auth.authToken },
                data: {},
            })
            .then((res) => {
                successToast("Removed Playlist",theme)
                setPlaylist([...res.data.playlists]);
            })
            .catch((err) => {
                errorToast("Some error while removing Playlist",theme)
            });
    };

    const addToPlaylist = (playlistId, video) => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "post",
                url: `/api/user/playlists/${playlistId}`,
                headers: { authorization: auth.authToken },
                data: {
                    video,
                },
            })
            .then((res) => {
                successToast("Added video to Playlist",theme)
                setPlaylist((s) => [
                    ...s.map((playlist) =>
                        playlist._id === res.data.playlist._id
                            ? res.data.playlist
                            : playlist
                    ),
                ]);
            })
            .catch((err) => {
                errorToast("Some error while adding video",theme)
            });
    };

    const removeFromPlaylist = (playlistId, video) => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "delete",
                url: `/api/user/playlists/${playlistId}/${video._id}`,
                headers: { authorization: auth.authToken },
                data: {
                },
            })
            .then((res) => {
                successToast("Removing video from Playlist",theme)
                setPlaylist((s) => [
                    ...s.map((playlist) =>
                        playlist._id === res.data.playlist._id
                            ? res.data.playlist
                            : playlist
                    ),
                ]);
            })
            .catch((err) => {
                errorToast("Some error while removing video",theme)
            });
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            getPlaylists();
        }
    }, [auth]);

    return (
        <PlaylistContext.Provider value={{ playlist, addPlaylist, removePlaylist, addToPlaylist, removeFromPlaylist,showPlaylistModal, setShowPlaylistModal, createPlaylistModal, setCreatePlaylistModal }}>
            {children}
        </PlaylistContext.Provider>
    );
}

export const usePlaylist = () => useContext(PlaylistContext);
