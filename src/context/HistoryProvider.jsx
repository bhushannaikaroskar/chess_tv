import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { errorToast, successToast } from "../utils";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";

const HistoryContext = createContext();

export default function HistoryProvider({ children }) {
    const [history, setHistory] = useState([]);
    const { auth } = useAuth();
    const {theme} = useTheme()

    const getHistory = () => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "get",
                url: "/api/user/history",
                headers: { authorization: auth.authToken },
                data: {},
            })
            .then((res) => {
                setHistory([...res.data.history]);
            })
            .catch((err) => {
                errorToast("Some error occured while fetching history")
            });
    };

    const addToHistory = (video) => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "post",
                url: "/api/user/history",
                headers: { authorization: auth.authToken },
                data: {
                    video,
                },
            })
            .then((res) => {
                setHistory([...res.data.history]);
            })
            .catch((err) => {
                errorToast("Some error occured while adding history")
            });
    };

    const removeFromHistory = (video) => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "delete",
                url: `/api/user/history/${video._id}`,
                headers: { authorization: auth.authToken },
                data: {},
            })
            .then((res) => {
                setHistory([...res.data.history]);
            })
            .catch((err) => {
                errorToast("Unable to remove video",theme)
            });
    };

    const clearHistory = () => {
        if (!auth.isAuthenticated) {
            errorToast("User is not Authenticated",theme)
            return;
        }
        axios
            .request({
                method: "delete",
                url: "/api/user/history/all",
                headers: { authorization: auth.authToken },
                data: {},
            })
            .then((res) => {
                successToast("Cleared history",theme)
                setHistory([...res.data.history]);
            })
            .catch((err) => {
                errorToast("Unable to clear history",theme)
            });
    };

    useEffect(()=>{
        if(auth.isAuthenticated){
            getHistory()
        }else{
            setHistory([])
        }
    },[auth])

    return (
        <HistoryContext.Provider
            value={{ history, clearHistory, removeFromHistory, addToHistory }}
        >
            {children}
        </HistoryContext.Provider>
    );
}

export const useHistory = () => useContext(HistoryContext)