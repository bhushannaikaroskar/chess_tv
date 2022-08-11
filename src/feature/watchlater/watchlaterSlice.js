import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, successToast } from "../../utils";

const initialState = {
    watchLaterVideos:[]
}

const addWatchLaterVideo = async (video,auth,theme,setLoader=()=>{}) => {
    if(!auth.isAuthenticated){
        errorToast("Login to add video to Watch later",theme)
        throw new Error("login first");
    }

    try {
        const res = await axios.request({
            method: "post",
            url: "/api/user/watchlater",
            headers: {authorization: auth.authToken},
            data:{
                video
            }
        })
        if(res.status === 409 ){
            throw new Error(res.message)
        }
        successToast("Added to Watch later",theme)
        setLoader(false);
        return res.data

    } catch (err) {
        errorToast("Some error while adding to Watch later",theme)
        setLoader(false)
        throw err;
    }
}

const removeWatchLaterVideo = async (video,auth,theme,setLoader=()=>{}) => {
    if(!auth.isAuthenticated){
        errorToast("Login to add video to Watch later",theme)
        throw new Error("login first");
    }

    try {
        const res = await axios.request({
            method: "delete",
            url: `/api/user/watchlater/${video._id}`,
            headers: {authorization: auth.authToken},
            data:{}
        })
        successToast("Removed from Watch later",theme)
        setLoader(false);
        return res.data

    } catch (err) {
        errorToast("Some error while removing from Watch later",theme)
        setLoader(false)
        throw err;
    }
}

export const getWatchLaterVideo = createAsyncThunk("watchlater/getWatchLater",async (_,thunkAPI)=>{

    const auth = thunkAPI.getState().auth;
    const theme = thunkAPI.getState().theme.theme;

    if(!auth.isAuthenticated){
        errorToast("Login to add video to Watch later",theme)
        throw new Error("login first");
    }

    try {
        const res = await axios.request({
            method: "get",
            url: `/api/user/watchlater`,
            headers: {authorization: auth.authToken},
            data:{}
        })
        return res.data
    } catch (err) {
        errorToast("Some error while fetching Watch later",theme)
        return thunkAPI.rejectWithValue("error")
    }
})

export const toggleWatchLater = createAsyncThunk("watchlater/toggleWatchLater",async ({video,setLoader=()=>{}},thunkAPI) => {

    const auth = thunkAPI.getState().auth;
    const theme = thunkAPI.getState().theme.theme;
    const watchLaterVideos = thunkAPI.getState().watchlater.watchLaterVideos;

    try {
        if(watchLaterVideos.find(vid => vid._id === video._id)){
            const data = await removeWatchLaterVideo(video,auth,theme,setLoader);
            return data
        }else{
            const data = await addWatchLaterVideo(video,auth,theme,setLoader);
            return data
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }

    
}) 

const watchlaterSlice = createSlice({
    name:"watchlater",
    initialState,
    reducers:{
        resetWatchLater:(state)=>{
            state.watchLaterVideos = [];
        }
    },
    extraReducers:{
        [getWatchLaterVideo.fulfilled]:(state,action)=>{
            state.watchLaterVideos = action.payload.watchlater
        },
        [toggleWatchLater.fulfilled]:(state,action)=>{
            state.watchLaterVideos = action.payload.watchlater
        },
        [toggleWatchLater.rejected]:(state,action)=>{
        }
    },
})

export const {resetWatchLater} = watchlaterSlice.actions;
export default watchlaterSlice.reducer;