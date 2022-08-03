import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../utils";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";

const WatchLaterContext = createContext();

export default function WatchLaterProvider({ children }) {

    const [watchLaterVideos,setWatchLaterVideos] = useState([]);
    // const { auth} = useAuth();
    const auth = useSelector((state)=> state.auth)
    const {theme} = useTheme();

    const addWatchLaterVideo = (video,setLoader=()=>{}) => {
        axios.request({
            method: "post",
            url: "/api/user/watchlater",
            headers: {authorization: auth.authToken},
            data:{
                video
            }
        }).then((res)=>{
            successToast("Added to Watch later",theme)
            setWatchLaterVideos([...res.data.watchlater])
            setLoader(false);
        }).catch((err)=>{
            auth.isAuthenticated
                ? errorToast("Some error while adding to Watch later",theme)
                : errorToast("Login to add video to Watch later",theme)
            setLoader(false)
        })
    }

    const removeWatchLaterVideo = (video,setLoader=()=>{}) => {
        axios.request({
            method: "delete",
            url: `/api/user/watchlater/${video._id}`,
            headers: {authorization: auth.authToken},
            data:{
            }
        }).then((res)=>{
            successToast("Removed from Watch later",theme)
            setWatchLaterVideos([...res.data.watchlater])
            setLoader(false);
        }).catch((err)=>{
            errorToast("Some error while adding to Watch later",theme)
            setLoader(false)
        })
    }

    const getWatchLaterVideo = (setLoader=()=>{}) => {
        axios.request({
            method: "get",
            url: `/api/user/watchlater`,
            headers: {authorization: auth.authToken},
            data:{
            }
        }).then((res)=>{
            setWatchLaterVideos([...res.data.watchlater])
            setLoader(false);
        }).catch((err)=>{
            errorToast("Some error while fetching Watch later",theme)
            setLoader(false)
        })
    }

    const toggleWatchLater = (video) => {
        if(watchLaterVideos.find(vid => vid._id === video._id)){
            removeWatchLaterVideo(video);
        }else{
            addWatchLaterVideo(video)
        }
    }

    useEffect(()=>{
        if(auth.isAuthenticated){
            getWatchLaterVideo()
        }else{
            setWatchLaterVideos([])
        }
    },[auth])

    return (
        <WatchLaterContext.Provider value={{watchLaterVideos,toggleWatchLater}}>
            {children}
        </WatchLaterContext.Provider>
    );
}

export const useWatchLater = () => useContext(WatchLaterContext)