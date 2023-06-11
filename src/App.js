import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavigationBar from "./components/navigation/NavigationBar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TheatreList from "./pages/TheatreList";
import CarouselHomepage from "./components/carousel/CarouselHomepage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </div>
    );
}

function AppContent() {
    const location = useLocation();

    return (
        <div className={location.pathname === '/' ? 'relative' : ''}>
            <NavigationBar/>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/theatre" element={<TheatreList />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
