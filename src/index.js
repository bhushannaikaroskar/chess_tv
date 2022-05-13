import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { makeServer } from "./server";
import { VideoProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

makeServer();

root.render(
    <React.StrictMode>
        <AuthProvider>
            <VideoProvider>
                <Router>
                    <App />
                </Router>
            </VideoProvider>
        </AuthProvider>
    </React.StrictMode>
);
