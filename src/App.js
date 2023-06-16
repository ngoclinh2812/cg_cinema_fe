import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavigationBar from "./components/navigation/NavigationBar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TheatreList from "./pages/TheatreList";
import RegisterConfirmed from "./pages/RegisterConfirm";
import MovieDetails from "./pages/MovieDetails";
import { useState } from "react";
import DateCalculator from "./components/movie/DateCalculator";
import {Room} from "./components/theatre/Room";

function App() {
    return (
        <div>
            <BrowserRouter>
                <AppContent />
                <DateCalculator />
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
                <Route path="/register-confirm" element={<RegisterConfirmed />}/>
                <Route path="/theatre" element={<TheatreList />} />
                <Route path="/room" element={<Room />} />
                <Route path="/movies/:id" element={<MovieDetails />}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
