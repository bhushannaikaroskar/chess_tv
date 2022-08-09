import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useVideos } from "../../context";
import { setSearchValue } from "../../feature";
import { SearchIcon } from "../icons/icons";

export default function SearchBar() {

    const [value,setValue] = useState("")
    // const {setSearchValue} = useVideos()
    const dispatch = useDispatch()
    const naviagte = useNavigate();
    const location = useLocation();

    const searchHandler = (e) =>{
        if(e.code === "Enter" || e.target.parentElement.className === "search-button"){
            dispatch(setSearchValue({searchValue:value}))
            setValue("")
            if(location.pathname !== "/explore"){
                naviagte("/explore")
            }
        }
    }

    return (
        <div
            className="nav-search-container"
        >
            <input
                style={{ width: "100%" }}
                type="search"
                value={value}
                className="input-field nav-search input-rounded"
                placeholder="Search"
                onChange={(e)=>setValue(e.target.value)}
                onKeyDownCapture={searchHandler}
            />
            
            <button className="search-button" onClick={searchHandler}>
            <SearchIcon/>
            </button>
        </div>
    );
}
