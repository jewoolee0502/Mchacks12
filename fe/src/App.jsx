import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ass from "./Comp/ass";
import Menu from "./Comp/Menu";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Ass />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;