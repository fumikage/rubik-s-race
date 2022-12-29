import "./App.css";
import Home from "./pages/home";
import PageNotFound from "./pages/page-not-found";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
