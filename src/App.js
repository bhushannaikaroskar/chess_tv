import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
    ExplorePage,
    HistoryPage,
    HomePage,
    LikedVideosPage,
    LoginPage,
    PlaylistPage,
    SignUpPage,
    WatchLaterPage,
} from "./pages";
import {
    PrivateRoute,
    RestrictedRoute,
    Sidebar,
    NavBar,} from "./components"
import VideoPage from "./pages/videopage/VideoPage";
import { createPortal } from "react-dom";
import PlaylistModal from "./components/PlaylistModal";

const ReactPortal = ()=>createPortal(<PlaylistModal/>,document.getElementById("modal-root"))

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
            
            <ToastContainer position="bottom-right" />
            <ReactPortal/>
        </div>
    );
}

export default App;
