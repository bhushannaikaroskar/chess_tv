import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const HistoryContext = createContext();

export default function HistoryProvider({ children }) {
    const [history, setHistory] = useState([]);
    const { auth } = useAuth();

    const getHistory = () => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(res.data.history);
                setHistory([...res.data.history]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addToHistory = (video) => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(res.data.history);
                setHistory([...res.data.history]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removeFromHistory = (video) => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(res.data.history);
                setHistory([...res.data.history]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const clearHistory = () => {
        if (!auth.isAuthenticated) {
            console.log("User is not Authenticated");
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
                console.log(res.data.history);
                setHistory([...res.data.history]);
            })
            .catch((err) => {
                console.log(err);
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