import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const PlaylistContext = createContext();

export default function PlaylistProvider({ children }) {
    const [playlist, setPlaylist] = useState([]);
    const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const { auth } = useAuth();

    const getPlaylists = () => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(err);
            });
    };

    const addPlaylist = (title, description) => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(res.data.playlists);
                setPlaylist([...res.data.playlists]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removePlaylist = (playlistId) => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(res.data.playlists);
                setPlaylist([...res.data.playlists]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addToPlaylist = (playlistId, video) => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(res.data.playlist);
                setPlaylist((s) => [
                    ...s.map((playlist) =>
                        playlist._id === res.data.playlist._id
                            ? res.data.playlist
                            : playlist
                    ),
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removeFromPlaylist = (playlistId, video) => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(res.data.playlist);
                setPlaylist((s) => [
                    ...s.map((playlist) =>
                        playlist._id === res.data.playlist._id
                            ? res.data.playlist
                            : playlist
                    ),
                ]);
            })
            .catch((err) => {
                console.log(err);
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
