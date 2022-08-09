import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../../utils";

const initialState = {
    likedVideos:[]
}

const addLike = async (video,auth,theme,setLoader=()=>{}) => {
    if(!auth.isAuthenticated){
        errorToast("Login to like the video",theme)
        throw new Error("login first");
    }
    setLoader(true);
    try {
        const res = await axios.request({
            method: "post",
            url: "/api/user/likes",
            headers: {authorization: auth.authToken},
            data:{
                video:video
            }
        })
        if(res.status === 409 ){
            throw new Error(res.message)
        }
        successToast("Liked video",theme) 
        // setLikedVideos([...res.data.likes])
        setLoader(false)
        return res.data
    } catch (err) {
        errorToast("Some error while liking the video",theme)
        setLoader(false)
        throw err;
    }
}

export const getLikes = createAsyncThunk("like/getLikes",async (_,thunkAPI) => {
    const auth = thunkAPI.getState().auth
    const theme = thunkAPI.getState().theme.theme
    if(!auth.isAuthenticated){
        errorToast("Login to Like the video",theme)
        throw new Error("login first");
    }
    try {
        const res = await axios.request({
            method: "get",
            url: "/api/user/likes",
            headers: {authorization: auth.authToken},
            data:{
    
            }
        })
        return res.data
    } catch (err) {
        errorToast("Error while fetching Liked Videos",theme)
        console.log(err)
        return thunkAPI.rejectWithValue(err.response);
    }
})

const deleteLike = async (video,auth,theme,setLoader=()=>{}) => {
    if(!auth.isAuthenticated){
        errorToast("User is not Authenticated",theme)
        throw new Error("Login first to Unlike")
    }
    setLoader(true);

    try {
        const res = await axios.request({
            method: "delete",
            url: `/api/user/likes/${video._id}`,
            headers: {authorization: auth.authToken},
            data:{
    
            }
        })
        successToast("Unliked video",theme)
        setLoader(false)
        return res.data
    } catch (err) {
        errorToast("Some error while disliking video",theme);
        setLoader(false)
        return err
    }
}

export const toggleLike = createAsyncThunk("like/toggleLike",async ({video,setLoader=()=>{}},thunkAPI)=>{
    const auth = thunkAPI.getState().auth;
    const theme = thunkAPI.getState().theme.theme;

    const {likedVideos} = thunkAPI.getState().like
    try{
        if(likedVideos.find(vid => vid._id === video._id)){
           const data = await deleteLike(video,auth,theme);
           return data
        }else{
            const data = await addLike(video,auth,theme);
            return data
        }
    }catch(err){
        console.log(err)
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

const likeSlice = createSlice({
    name:"like",
    initialState,
    reducers:{
        resetLikes:(state)=>{
            state.likedVideos = [];
        }
    },
    extraReducers:{
        [getLikes.fulfilled]:(state,action)=>{
            console.log(action)
            state.likedVideos = [...action.payload.likes]
        },
        [getLikes.rejected]:(state,action)=>{
            console.log("get likes rejected",action.payload)
            // state.likedVideos = [...action.payload.likes]
        },
        [toggleLike.fulfilled] : (state,action)=>{
            state.likedVideos = action.payload.likes
        },
    }
})

export const {resetLikes} = likeSlice.actions;
export default likeSlice.reducer;