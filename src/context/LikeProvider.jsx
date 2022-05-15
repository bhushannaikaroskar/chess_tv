import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const LikeContext = createContext();

export default function LikeProvider({children}) {

    const [likedVideos,setLikedVideos] = useState([]);
    const {auth} = useAuth();


    const addLike = (video,setLoader=()=>{}) => {
        if(!auth.isAuthenticated){
            console.log("User is not Authenticated")
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
            console.log(res.data.likes)
            setLikedVideos([...res.data.likes])
            setLoader(false)
        }).catch((err)=>{
            console.log(err)
            setLoader(false)
        })
    }

    const getLikes = () => {
        if(!auth.isAuthenticated){
            console.log("User is not Authenticated")
            return
        }
        axios.request({
            method: "get",
            url: "/api/user/likes",
            headers: {authorization: auth.authToken},
            data:{

            }
        }).then((res)=>{
            console.log(res.data.likes)
            setLikedVideos([...res.data.likes])
        }).catch((err)=>{
            console.log(err)
        })
    }

    const deleteLike = (video,setLoader=()=>{}) => {
        if(!auth.isAuthenticated){
            console.log("User is not Authenticated")
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
            console.log(res.data.likes)
            setLikedVideos([...res.data.likes])
            setLoader(false)
        }).catch((err)=>{
            console.log(err)
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