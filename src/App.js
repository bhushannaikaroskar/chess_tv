import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage, NavBar, Sidebar } from "./components";

function App() {
    return (
        <div className="grand-body">
            <NavBar isVisible={true} />
            <NavBar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;
