import "./App.css";
import Home from "./pages/home";
import PageNotFound from "./pages/page-not-found";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePlayer from "./pages/single-player";
import TwoPlayer from "./pages/two-player";

function App() {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/singleplayer"
                        element={<SinglePlayer />}
                    ></Route>
                    <Route path="/twoplayer" element={<TwoPlayer />}></Route>
                    <Route path="*" element={<PageNotFound />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
