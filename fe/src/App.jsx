import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ass from "./Comp/ass";
import Menu from "./Comp/Menu";
import Home from "./Comp/home";
import MM from "./Comp/MM";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/MM" element={<MM />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;