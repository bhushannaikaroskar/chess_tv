import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage, NavBar, Sidebar } from "./components";
import LoginPage from "./components/authpage/LoginPage";

function App() {
    return (
        <div className="grand-body">
            <NavBar isVisible={true} />
            <NavBar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
