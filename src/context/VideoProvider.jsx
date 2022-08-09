import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { errorToast } from "../utils";
import { initialVideoState, videoReducer } from "./reducers";
import { useTheme } from "./ThemeProvider";

const VideoContext = createContext();

export default function VideoProvide({ children }) {
    const [videoState, dispatchVideos] = useReducer(videoReducer, initialVideoState);

    const [modalId,setModalId] = useState("");
    const [searchValue,setSearchValue] = useState("");
    const location = useLocation()
    const {theme} = useSelector((state) => state.theme)

    const fetchVideos = () => {
        axios.request({
            method: "get",
            url: "/api/videos",
            data: {},
        }).then((res)=>{
            dispatchVideos({type:"ADD_VIDEOS",payload:{videos:res.data.videos}})
        }).catch(err => errorToast("There was some error fetching videos",theme));
    };

    useEffect(()=>{
        fetchVideos()
    },[])
    
    useEffect(()=>{
        setModalId("")
        if(location.pathname !== "/explore"){
            dispatchVideos({type:"RESET_FILTERS"})
            setSearchValue("")
        }
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

        return filteredVideos.filter(video => video.title.toLowerCase().includes(searchValue.toLowerCase().trim()));
    }

    return (
        <VideoContext.Provider value={{ videoState, dispatchVideos, modalId, toggleModal, videoFilter, searchValue, setSearchValue }}>
            {children}
        </VideoContext.Provider>
    );
}

export const useVideos = () => useContext(VideoContext);
