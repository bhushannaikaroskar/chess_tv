import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../../utils";

const initialState = {
    history: [],
};

export const getHistory = createAsyncThunk(
    "history/getHistory",
    async (_, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios.request({
                method: "get",
                url: "/api/user/history",
                headers: { authorization: auth.authToken },
                data: {},
            });
            return res.data;
        } catch (error) {
            errorToast("Some error occured while fetching history", theme);
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const addToHistory = createAsyncThunk(
    "history/addToHistory",
    async ({ video }, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios.request({
                method: "post",
                url: "/api/user/history",
                headers: { authorization: auth.authToken },
                data: {
                    video,
                },
            });
            return res.data;
        } catch (error) {
            errorToast("Some error occured while adding history",theme)
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const removeFromHistory = createAsyncThunk(
    "history/removeFromHistory",
    async ({ video }, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios.request({
                method: "delete",
                url: `/api/user/history/${video._id}`,
                headers: { authorization: auth.authToken },
                data: {},
            });
            return res.data;
        } catch (error) {
            errorToast("Unable to remove video",theme)
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const clearHistory = createAsyncThunk(
    "history/clearHistory",
    async (_, thunkAPI) => {
        const auth = thunkAPI.getState().auth;
        const { theme } = thunkAPI.getState().theme;
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated", theme);
            throw new Error("login first");
        }
        try {
            const res = await axios.request({
                method: "delete",
                url: "/api/user/history/all",
                headers: { authorization: auth.authToken },
                data: {},
            });
            successToast("Cleared history",theme)
            return res.data;
        } catch (error) {
            errorToast("Unable to clear history",theme)
            return thunkAPI.rejectWithValue("error");
        }
    }
);

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        resetHistory: (state) => {
            state.history = [];
        },
    },
    extraReducers: {
        [getHistory.fulfilled]: (state, action) => {
            state.history = action.payload.history;
        },
        [addToHistory.fulfilled]: (state, action) => {
            state.history = action.payload.history;
        },
        [removeFromHistory.fulfilled]: (state, action) => {
            state.history = action.payload.history;
        },
        [clearHistory.fulfilled]: (state, action) => {
            state.history = action.payload.history;
        },
    },
});

export const { resetHistory } = historySlice.actions;
export default historySlice.reducer;
