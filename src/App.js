import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavigationBar from "./components/navigation/NavigationBar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TheatreList from "./pages/TheatreList";
import CarouselHomepage from "./components/carousel/CarouselHomepage";
import { useState } from "react";

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
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <div className={location.pathname === '/' ? 'relative' : ''}>
            <NavigationBar loggedIn={loggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/theatre" element={<TheatreList />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
