import './App.css';
import Footer from "./components/Footer";
import NavigationBar from "./components/navigation/NavigationBar";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TheatreList from "./pages/TheatreList";
import CarouselHomepage from "./components/carousel/CarouselHomepage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <div className="relative">
                    <NavigationBar />
                    <Routes>
                        <Route index element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/theatre" element={<TheatreList />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
