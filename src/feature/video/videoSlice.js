import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, successToast } from "../../utils";

const initialState = {
    videos: [],
    searchValue: "",
    modalId:"",
    filters: {
        learn: false,
        openings: false,
        tournament: false,
        advanced: false,
    },
}

export const fetchVideos = createAsyncThunk("video/fetchVideos",async (_,thunkAPI)=>{
    const {theme} = thunkAPI.getState().theme
    try {
        const res = await axios.request({
            method: "get",
            url: "/api/videos",
            data: {},
        });
        return res.data;
    } catch (err) {
        errorToast("There was some error fetching videos",theme);
        return thunkAPI.rejectWithValue(err.response);
    }
})

export const videoFilter = (state) => {
    const filters = state.filters;
    let filteredVideos
    if(Object.entries(filters).some(([key,value])=>value)){
        filteredVideos = state.videos.filter((video)=> filters[video.category])
    }else{
        filteredVideos = [...state.videos]
    }

    return filteredVideos.filter(video => video.title.toLowerCase().includes(state.searchValue.toLowerCase().trim()));
}

const videoSlice = createSlice({
    name:"video",
    initialState,
    reducers:{
        toggleModal:(state,action)=>{
            if(state.modalId === action.payload.videoId){
                state.modalId = ""
            }else{
                state.modalId = action.payload.videoId;
            }
        },
        toggleVideoFilter:(state,action)=>{
            state.filters[action.payload.key]=!state.filters[action.payload.key]
        },
        resetFilters:(state)=>{
            state.filters = {...initialState.filters}
        },
        setSearchValue:(state,action)=>{
            state.searchValue = action.payload.searchValue;
        },
        setModalId:(state,action)=>{
            state.modalId = action.payload.value;
        }
    },
    extraReducers:{
        [fetchVideos.fulfilled]:(state,action)=>{
            state.videos = action.payload.videos;
        },
    },

})

export const {toggleModal,toggleVideoFilter, resetFilters,setSearchValue, setModalId} = videoSlice.actions;
export default videoSlice.reducer;