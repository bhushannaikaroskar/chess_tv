import React from 'react'
import { usePlaylist } from '../context'
import AddPlaylistModal from '../pages/playlistpage/AddPlaylistModal'
import SelectPlaylistModal from '../pages/playlistpage/SelectPlaylistModal'

export default function PlaylistModal() {

    const {selectedVideo,createPlaylistModal,showPlaylistModal} = usePlaylist()
  return (
    <>
        {showPlaylistModal && <SelectPlaylistModal video={selectedVideo}/>}
        {createPlaylistModal && <AddPlaylistModal/>}
    </>
  )
}
