import React, { useState } from "react";
import "./videocard.css";

const getViewString = (views) => {
    let viewCount = "";
    let viewSymbol = ""
    if(views>1000000){
        viewSymbol = "M"
        views = views/1000000;
        if(views>10){
            views = "" + views;
            viewCount = views.substring(0,2);
        }else{
            views = "" + views;
            viewCount = views.substring(0,3);
        }
    }else if(views>1000){
        viewSymbol = "K"
        views = views/1000;
        if(views>10 && views<100){
            views = "" + views;
            viewCount = views.substring(0,2);
        }else{
            views = "" + views;
            viewCount = views.substring(0,3);
        }
    }else{
        viewCount = "" + views;
    }

    return viewCount + viewSymbol
}

export default function VideoCard({ video }) {
    const { title, videoThumbnail, channelName, channelThumbNail, views } = video;
    const [isModal, setIsModal] = useState(false);

    

    return (
        <div className="grand-video-card">
            <div className="grand-video-img-container">
                    <div className="grand-img-overlay">
                        <span className="material-icons-round grand-btn-lg">play_arrow</span>
                        <h3>Play</h3>
                    </div>
                <img className="grand-video-img" src={videoThumbnail} alt="" />
            </div>
            <div className="grand-content-wrapper">
                <div className="grand-channel-img-wrapper">
                    <img className="grand-channel-img" src={channelThumbNail} alt=""/>
                </div>
                <div className="grand-content">
                    <div className="grand-card-title">{title}</div>
                    <div className="grand-channel-name">{channelName}</div>
                    <div className="grand-channel-name">{`${getViewString(views)} views . 8 months ago`}</div>

                </div>
                <button className="grand-video-card-btn">
                    <span className="material-icons ">more_vert</span>
                </button>
            </div>
        </div>
    );
}
