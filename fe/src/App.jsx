import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Comp/Menu";
import Home from "./Comp/home";
import MM from "./Comp/MM";
import Bot from "./Comp/bot";
import TextPressure from "./Comp/title";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/MM" element={<MM />} />
                <Route path="/bot" element={<Bot />} />
                <Route path="/title" element={<TextPressure />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;