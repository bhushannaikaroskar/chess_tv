import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { errorToast, successToast } from "../utils";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";

const LikeContext = createContext();

export default function LikeProvider({children}) {

    const [likedVideos,setLikedVideos] = useState([]);
    const {auth} = useAuth();
    const {theme} = useTheme()

    const addLike = (video,setLoader=()=>{}) => {
        if(!auth.isAuthenticated){
            errorToast("Login to like the video",theme)
            return;
        }
        setLoader(true);
        axios.request({
            method: "post",
            url: "/api/user/likes",
            headers: {authorization: auth.authToken},
            data:{
                video:video
            }
        }).then((res)=>{
            successToast("Liked video",theme)
            setLikedVideos([...res.data.likes])
            setLoader(false)
        }).catch((err)=>{
            errorToast("Some error occured while disliking the video",theme)
            setLoader(false)
        })
    }

    const getLikes = () => {
        if(!auth.isAuthenticated){
            errorToast("Login to Like the video",theme)
            return
        }
        axios.request({
            method: "get",
            url: "/api/user/likes",
            headers: {authorization: auth.authToken},
            data:{

            }
        }).then((res)=>{
            setLikedVideos([...res.data.likes])
        }).catch((err)=>{
            errorToast("Error while fetching Liked Videos",theme)
        })
    }

    const deleteLike = (video,setLoader=()=>{}) => {
        if(!auth.isAuthenticated){
            errorToast("User is not Authenticated",theme)
            return
        }
        setLoader(true);
        axios.request({
            method: "delete",
            url: `/api/user/likes/${video._id}`,
            headers: {authorization: auth.authToken},
            data:{

            }
        }).then((res)=>{
            successToast("Unliked video",theme)
            setLikedVideos([...res.data.likes])
            setLoader(false)
        }).catch((err)=>{
            errorToast("Some error while disliking video",theme);
            setLoader(false)
        })
    }

    const toggleLike = (video) =>{
        if(likedVideos.find(vid => vid._id === video._id)){
            deleteLike(video)
        }else{
            addLike(video);
        }
    }

    useEffect(()=>{
        if(auth.isAuthenticated){
            getLikes()
        }else{
            setLikedVideos([])
        }
    },[auth])

    return <LikeContext.Provider value={{likedVideos,toggleLike}}>{children}</LikeContext.Provider>;
}

export const useLikes = () => useContext(LikeContext);