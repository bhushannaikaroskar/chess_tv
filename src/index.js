import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";
import {
    LikeProvider,
    VideoProvider,
    AuthProvider,
    WatchLaterProvider,
    HistoryProvider,
} from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

makeServer();

root.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <VideoProvider>
                    <LikeProvider>
                        <WatchLaterProvider>
                            <HistoryProvider>
                                <App />
                            </HistoryProvider>
                        </WatchLaterProvider>
                    </LikeProvider>
                </VideoProvider>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
