import React, { useState } from "react";
import { useVideos } from "../../context";
import { SearchIcon } from "../icons/icons";

export default function SearchBar() {

    const [value,setValue] = useState("")
    const {setSearchValue} = useVideos()

    const searchHandler = (e) =>{
        if(e.code === "Enter"){
            console.log(value)
            setSearchValue(value)
            setValue("")
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
