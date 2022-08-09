import React from "react";
import { useVideos } from "../../context";
import { VideoCard } from "../../components";
import "./explorepage.css";
import { useDocumentTitle } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {resetFilters, toggleVideoFilter, videoFilter} from "../../feature"

export default function ExplorePage() {

    // const {videoState,videoFilter,dispatchVideos,searchValue} = useVideos();
    const videoState = useSelector(state =>state.video)
    const {searchValue} = videoState;
    const dispatch = useDispatch();
    useDocumentTitle("Explore")

    // const videoList = videoFilter(videoState);
    const videoList = videoFilter(videoState)

    return (
        <main className="grand-main">
            <div className="grand-tags">
                <button className={`grand-tag ${Object.values(videoState.filters).every(value => !value)?"grand-tag-active":""}`} onClick={()=>{dispatch(resetFilters())}}>
                    <div className="font-black">All</div>
                </button>
                <button className={`grand-tag ${videoState.filters.learn?"grand-tag-active":""}`} onClick={()=>dispatch(toggleVideoFilter({key:"learn"}))}>
                    <div className="font-black">learn</div>
                </button>
                <button className={`grand-tag ${videoState.filters.openings?"grand-tag-active":""}`} onClick={()=>dispatch(toggleVideoFilter({key:"openings"}))}>
                    <div className="font-black">Chess openings</div>
                </button>
                <button className={`grand-tag ${videoState.filters.tournament?"grand-tag-active":""}`} onClick={()=>dispatch(toggleVideoFilter({key:"tournament"}))}>
                    <div className="font-black">tournaments</div>
                </button>
                <button className={`grand-tag ${videoState.filters.advanced?"grand-tag-active":""}`} onClick={()=>dispatch(toggleVideoFilter({key:"advanced"}))}>
                    <div className="font-black">advanced chess</div>
                </button>
            </div>
            {searchValue  && <div className="font-normal">Showing results for {<b className="font-large">{searchValue}</b>}</div>}
            <div className="grand-video-list">
                {videoList.map((video)=>{
                    return <VideoCard video={video}/>
                })}
                
            </div>
            {videoList.length === 0 && <div className="grand-empty">
                <div className=" font-x-large">
                    Search not found.
                </div>
            </div>}
        </main>
    );
}
