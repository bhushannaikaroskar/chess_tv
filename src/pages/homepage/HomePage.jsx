import React from "react";
import { useNavigate } from "react-router-dom";
import { useVideos } from "../../context";
import { useDocumentTitle } from "../../utils";
import "./homepage.css";

const categoryData = [
    {
        name:"Tournament",
        category:"tournament",
        imgSrc:"https://res.cloudinary.com/grandimages/image/upload/v1651560603/chess_tv/catgories/category_4_qq4grr.jpg"
    },
    {
        name:"Learn",
        category:"learn",
        imgSrc:"https://res.cloudinary.com/grandimages/image/upload/v1651560516/chess_tv/catgories/category_1_u6a12h.png"
    },
    {
        name:"Chess Openings",
        category:"openings",
        imgSrc:"https://res.cloudinary.com/grandimages/image/upload/v1651560515/chess_tv/catgories/category_2_geohci.jpg"
    },
    {
        name:"Advanced",
        category:"advanced",
        imgSrc:"https://res.cloudinary.com/grandimages/image/upload/v1651560514/chess_tv/catgories/category_3_ouknpf.jpg"
    },
]

export default function HomePage() {

    const navigate = useNavigate();
    const { dispatchVideos } = useVideos()
    useDocumentTitle("Home")

    const categoryHandler = (keyValue) => {
        dispatchVideos({type:"RESET_FILTERS"})
        dispatchVideos({type:"TOGGLE_FILTERS",payload:{key:keyValue}})
        navigate("/explore") 
    }

    return (
        <main className="grand-main">
            <div className="grand-hero-section">
                <img
                    className="grand-hero-img"
                    src="https://res.cloudinary.com/grandimages/image/upload/v1651479884/chess_tv/Chess_k3pmep.webp"
                    alt="chess-hero"
                />
                <div className="grand-hero-content">
                    <h1>A Video Library for all Chess Lover</h1>
                    <div className="p-2"></div>
                    <button className="btn btn-primary hero-button" onClick={()=>navigate("/explore")}>Explore</button>
                </div>
            </div>
            <h2 className="category-header">Categories</h2>
            <div className="grand-categories">
            {
                categoryData.map((categoryCard)=>{
                    return (
                        <div className="card-categories" onClick={()=>{categoryHandler(categoryCard.category)}}>
                            <img className="card-img" src={categoryCard.imgSrc} alt="category" />
                            <span className="card-container-text">{categoryCard.name}</span>
                        </div>)
                })
            }
            </div>
        </main>
    );
}
