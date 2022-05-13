import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ExplorePage, HomePage, NavBar, Sidebar } from "./components";
import {LoginPage,SignUpPage} from "./components";

function App() {
    return (
        <div className="grand-body">
            <NavBar isVisible={true} />
            <NavBar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/explore" element={<ExplorePage />} />
            </Routes>
        </div>
    );
}

export default App;
