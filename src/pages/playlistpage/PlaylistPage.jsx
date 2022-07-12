import React, { useEffect, useState } from "react";
import { VideoCard } from "../../components";
import { usePlaylist } from "../../context";
import { useDocumentTitle } from "../../utils";
import AddPlaylistModal from "./AddPlaylistModal";

const styleObj = {
    backgroundColor: "var(--PRIMARY-200)",
};

export default function PlaylistPage() {
    const {
        playlist,
        createPlaylistModal,
        setCreatePlaylistModal,
        removePlaylist,
    } = usePlaylist();
    const [selectedPlaylist, setSelectedPlaylist] = useState(
        playlist.length > 0 ? playlist[0].title : ""
    );
    useDocumentTitle("Playlist ")

    const switchPlaylist = (playlistId) => {
        setSelectedPlaylist(playlistId);
    };

    const getSelectedPlaylistVideos = (playlist) => {
        return (
            playlist.find((playlis) => playlis._id === selectedPlaylist)
                ?.videos ?? []
        );
    };

    useEffect(() => {
        if (playlist.length > 0 && selectedPlaylist === "") {
            setSelectedPlaylist(playlist[0]._id);
        } else if (
            playlist.length > 0 &&
            !playlist.find((list) => list._id === selectedPlaylist)
        ) {
            setSelectedPlaylist(playlist[0]._id);
        } else if (playlist.length === 0) {
            setSelectedPlaylist("");
        }
    }, [playlist]);

    return (
        <main className="grand-main">
            {createPlaylistModal && <AddPlaylistModal />}
            <div className="playlist-grid">
                <div className="playlist-options">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setCreatePlaylistModal((s) => !s);
                        }}
                    >
                        New Playlist
                    </button>
                    <ul className="list ">
                        {playlist.map((obj) => {
                            return (
                                <li className="list-item p-0">
                                    <button
                                        style={
                                            obj._id === selectedPlaylist
                                                ? styleObj
                                                : {}
                                        }
                                        className="btn btn-link-secondary btn-focus-primary w-100 justify-content-start font-large p-y-0_5"
                                        onClick={() => switchPlaylist(obj._id)}
                                    >
                                        {obj.title}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {playlist.length > 0 && (
                    <div className="playlist-video-container">
                        <div className="playlist-video-cta">
                            <h1>
                                {
                                    playlist.find(
                                        (playlist) =>
                                            playlist._id === selectedPlaylist
                                    )?.title
                                }
                            </h1>
                            {selectedPlaylist && (
                                <button
                                    class="btn btn-outline btn-outline-primary"
                                    onClick={() =>
                                        removePlaylist(selectedPlaylist)
                                    }
                                >
                                    Delete playlist
                                </button>
                            )}
                        </div>
                        <div className="playlist-video-content">
                            {getSelectedPlaylistVideos(playlist).map(
                                (video) => (
                                    <VideoCard
                                        video={video}
                                        playlistId={selectedPlaylist}
                                    />
                                )
                            )}
                        </div>
                        {getSelectedPlaylistVideos(playlist).length === 0 && (
                            <div className="playlist-video-container font-normal">
                                No videos in playlist.
                            </div>
                        )}
                    </div>
                )}
            </div>
            {playlist.length === 0 && (
                <div className="playlist-video-container font-normal">
                    No playlist present. Add playlist
                </div>
            )}
        </main>
    );
}
