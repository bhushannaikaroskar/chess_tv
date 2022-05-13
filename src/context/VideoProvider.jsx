import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const VideoContext = createContext();

const initialState = {
    videos: [],
    filters: [],
};

export default function VideoProvide({ children }) {
    const [videoState, dispatchVideos] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_VIDEOS":
                return { ...state, videos: [...action.payload.videos] };
            case "RESET_FILTERS":
                return { ...initialState };
            default:
                return state;
        }
    }, initialState);

    const fetchVideos = () => {
        axios.request({
            method: "get",
            url: "/api/videos",
            data: {},
        }).then((res)=>{
            console.log(res)
            dispatchVideos({type:"ADD_VIDEOS",payload:{videos:res.data.videos}})
        }).catch(err => console.log(err));
    };

    useEffect(()=>{
        fetchVideos()
    },[])

    return (
        <VideoContext.Provider value={{ videoState, dispatchVideos }}>
            {children}
        </VideoContext.Provider>
    );
}

export const useVideos = () => useContext(VideoContext);
