import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVideos } from "../../context";
import { SearchIcon } from "../icons/icons";

export default function SearchBar() {

    const [value,setValue] = useState("")
    const {setSearchValue} = useVideos()
    const naviagte = useNavigate();
    const location = useLocation();

    const searchHandler = (e) =>{
        if(e.code === "Enter"){
            console.log(value)
            setSearchValue(value)
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
            <SearchIcon/>
            <input
                style={{ width: "100%" }}
                type="search"
                value={value}
                className="input-field nav-search input-rounded"
                placeholder="Search"
                onChange={(e)=>setValue(e.target.value)}
                onKeyDownCapture={searchHandler}
            />
        </div>
    );
}
