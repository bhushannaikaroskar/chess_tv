import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
    ExplorePage,
    HomePage,
    NavBar,
    RestrictedRoute,
    Sidebar,
} from "./components";
import { LoginPage, SignUpPage } from "./components";
import VideoPage from "./components/videopage/VideoPage";

function App() {
    return (
        <div className="grand-body">
            <NavBar isVisible={true} />
            <NavBar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/video/:videoId" element={<VideoPage />} />
                <Route element={<RestrictedRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
