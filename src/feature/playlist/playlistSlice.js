import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../../utils";

const initialState = {
    playlist: [],
    createPlaylistModal: false,
    showPlaylistModal: false,
    selectedVideo: null,
};


export const getPlaylists = createAsyncThunk(
    "playlist/getPlaylists",
    async (_, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;

        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios.request({
                method: "get",
                url: "/api/user/playlists",
                headers: { authorization: auth.authToken },
                data: {},
            });
            return res.data;
        } catch (err) {
            errorToast("Some error while fetching playlist", theme);
            return thunkAPI.rejectWithValue("error occurred");
        }
    }
);

export const addPlaylist = createAsyncThunk(
    "playlist/addplaylists",
    async ({title, description}, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;

        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios.request({
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
            successToast("Added Playlist",theme)
            return res.data;
        } catch (err) {
            errorToast("Some error while adding Playlist",theme)
            return thunkAPI.rejectWithValue("error occurred");
        }
    }
);

export const removePlaylist = createAsyncThunk(
    "playlist/removePlaylist",
    async ({playlistId}, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;

        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios
            .request({
                method: "delete",
                url: `/api/user/playlists/${playlistId}`,
                headers: { authorization: auth.authToken },
                data: {},
            })
            successToast("Removed Playlist",theme)
            return res.data;
        } catch (err) {
            errorToast("Some error while removing Playlist",theme)
            return thunkAPI.rejectWithValue("error occurred");
        }
    }
);

export const addToPlaylist = createAsyncThunk(
    "playlist/addToPlaylist",
    async ({playlistId, video}, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;

        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios
            .request({
                method: "post",
                url: `/api/user/playlists/${playlistId}`,
                headers: { authorization: auth.authToken },
                data: {
                    video,
                },
            })
            successToast("Added video to Playlist",theme)
            return res.data;
        } catch (err) {
            errorToast(err.response.data.errors[0],theme)
            return thunkAPI.rejectWithValue("error occurred");
        }
    }
);

export const removeFromPlaylist = createAsyncThunk(
    "playlist/removeFromPlaylist",
    async ({playlistId, video}, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;

        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios
            .request({
                method: "delete",
                url: `/api/user/playlists/${playlistId}/${video._id}`,
                headers: { authorization: auth.authToken },
                data: {},
            })
            successToast("Removing video from Playlist",theme)
            return res.data;
        } catch (err) {
            errorToast(err.response.data.errors[0],theme)
            return thunkAPI.rejectWithValue("error occurred");
        }
    }
);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        resetPlaylist:(state)=>{
            state.playlist = []
        },
        setCreatePlaylistModal:(state,action)=>{
            state.createPlaylistModal = action.payload.value;
        },
        setSelectedVideo:(state,action)=>{
            state.selectedVideo = action.payload.video;
        },
        setShowPlaylistModal:(state,action)=>{
            state.showPlaylistModal = action.payload.value;
            if(!action.payload.value){
                state.selectedVideo = null;
            }
        }
    },
    extraReducers: {
        [getPlaylists.fulfilled]:(state,action)=>{
            state.playlist = action.payload.playlists
        },
        [addPlaylist.fulfilled]:(state,action)=>{
            state.playlist = action.payload.playlists
        },
        [removePlaylist.fulfilled]:(state,action)=>{
            state.playlist = action.payload.playlists
        },
        [addToPlaylist.fulfilled]:(state,action)=>{
            state.playlist = [...state.playlist.map((playlist) =>
            playlist._id === action.payload.playlist._id
                ? action.payload.playlist
                : playlist
            )]
        },
        [removeFromPlaylist.fulfilled]:(state,action)=>{
            state.playlist = [...state.playlist.map((playlist) =>
                playlist._id === action.payload.playlist._id
                    ? action.payload.playlist
                    : playlist
            )]
        }
    },
});

export const {resetPlaylist,setCreatePlaylistModal,setSelectedVideo,setShowPlaylistModal} = playlistSlice.actions;
export default playlistSlice.reducer;