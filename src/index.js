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
                            <App />
                        </WatchLaterProvider>
                    </LikeProvider>
                </VideoProvider>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
