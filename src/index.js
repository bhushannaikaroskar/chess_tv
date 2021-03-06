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
    PlaylistProvider,
} from "./context";
import ThemeProvider from "./context/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

makeServer();

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <VideoProvider>
                        <LikeProvider>
                            <WatchLaterProvider>
                                <PlaylistProvider>
                                    <HistoryProvider>
                                        <App />
                                    </HistoryProvider>
                                </PlaylistProvider>
                            </WatchLaterProvider>
                        </LikeProvider>
                    </VideoProvider>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
