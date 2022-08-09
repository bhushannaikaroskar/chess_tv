import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, successToast } from "../../utils";

const initialState = {
    theme:localStorage.getItem("chess-data-theme")?? "light"
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggleTheme:(state) => {
            if(state.theme === "dark"){
                state.theme = "light";
                localStorage.setItem('chess-data-theme', 'light');
            }else{
                state.theme = "dark";
                localStorage.setItem('chess-data-theme', 'dark');
            }
        },
    }
})

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;