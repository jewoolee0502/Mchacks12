import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ass from "./Comp/ass";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Ass />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;