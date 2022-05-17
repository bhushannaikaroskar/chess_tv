import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
    ExplorePage,
    HistoryPage,
    HomePage,
    LikedVideosPage,
    NavBar,
    PrivateRoute,
    RestrictedRoute,
    Sidebar,
    WatchLaterPage,
} from "./components";
import { LoginPage, SignUpPage } from "./components";
import PlaylistPage from "./components/playlistpage/PlaylistPage";
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

                <Route element={<PrivateRoute />}>
                    <Route path="/liked_videos" element={<LikedVideosPage />} />
                    <Route path="/watch_later" element={<WatchLaterPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/playlist" element={<PlaylistPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
