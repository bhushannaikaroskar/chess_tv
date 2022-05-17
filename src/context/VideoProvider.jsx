import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";

const VideoContext = createContext();

const initialState = {
    videos: [],
    filters: {
        learn: false,
        openings: false,
        tournament: false,
        advanced: false,
    },
};

export default function VideoProvide({ children }) {
    const [videoState, dispatchVideos] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_VIDEOS":
                return { ...state, videos: [...action.payload.videos] };
            case "TOGGLE_FILTERS":
                return {...state,filters:{...state.filters, [action.payload.key]:!state.filters[action.payload.key]}}
            case "RESET_FILTERS":
                return { ...state,filters:{...initialState.filters} };
            default:
                return state;
        }
    }, initialState);

    const [modalId,setModalId] = useState("");
    const location = useLocation()

    const fetchVideos = () => {
        axios.request({
            method: "get",
            url: "/api/videos",
            data: {},
        }).then((res)=>{
            dispatchVideos({type:"ADD_VIDEOS",payload:{videos:res.data.videos}})
        }).catch(err => console.log(err));
    };

    useEffect(()=>{
        fetchVideos()
    },[])
    
    useEffect(()=>{
        setModalId("")
    },[location])

    const toggleModal = (videoId) => {
        if(modalId === videoId){
            setModalId("");
        }else{
            setModalId(videoId);
        }
    }

    const videoFilter = (state) => {
        const filters = state.filters;
        let filteredVideos
        if(Object.entries(filters).some(([key,value])=>value)){
            filteredVideos = state.videos.filter((video)=> filters[video.category])
        }else{
            filteredVideos = [...state.videos]
        }

        return filteredVideos;
    }

    return (
        <VideoContext.Provider value={{ videoState, dispatchVideos, modalId, toggleModal, videoFilter }}>
            {children}
        </VideoContext.Provider>
    );
}

export const useVideos = () => useContext(VideoContext);
