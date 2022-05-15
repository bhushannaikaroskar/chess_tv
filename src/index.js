import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";
import { LikeProvider, VideoProvider, AuthProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

makeServer();

root.render(
    <React.StrictMode>
        <AuthProvider>
            <VideoProvider>
                <LikeProvider>
                    <Router>
                        <App />
                    </Router>
                </LikeProvider>
            </VideoProvider>
        </AuthProvider>
    </React.StrictMode>
);
