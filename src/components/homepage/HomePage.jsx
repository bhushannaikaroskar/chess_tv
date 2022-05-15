import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

export default function HomePage() {

    const navigate = useNavigate();

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
                <div className="card-categories">
                    <img className="card-img" src="https://res.cloudinary.com/grandimages/image/upload/v1651560603/chess_tv/catgories/category_4_qq4grr.jpg" alt="category" />
                    <span className="card-container-text">Tournament</span>
                </div>
                <div className="card-categories">
                    <img className="card-img" src="https://res.cloudinary.com/grandimages/image/upload/v1651560516/chess_tv/catgories/category_1_u6a12h.png" alt="category" />
                    <span className="card-container-text">Learn</span>
                </div>
                <div className="card-categories">
                    <img className="card-img" src="https://res.cloudinary.com/grandimages/image/upload/v1651560515/chess_tv/catgories/category_2_geohci.jpg" alt="category" />
                    <span className="card-container-text">Basics</span>
                </div>
                <div className="card-categories">
                    <img className="card-img" src="https://res.cloudinary.com/grandimages/image/upload/v1651560514/chess_tv/catgories/category_3_ouknpf.jpg"  alt="category"/>
                    <span className="card-container-text">Advanced</span>
                </div>
            </div>
        </main>
    );
}
