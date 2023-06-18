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
import {Room} from "./components/theatre/Room";
import Profile from "./pages/Profile";
import {OrderConfirm} from "./pages/OrderConfirm";
import {OrderCompleted} from "./pages/OrderCompleted";
import {OnGoingSlider} from "./components/carousel/OnGoingSlider";
import {ComingSoon} from "./components/carousel/ComingSoon";

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
        localStorage.removeItem('token');
    };


    return (
            <div className={location.pathname === '/' ? 'relative' : ''}>
                <NavigationBar loggedIn={loggedIn} onLogout={handleLogout} />
                <Routes>
                    <Route path="/theatre/room/:roomId" element={<Room />} />
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/profile" element={<Profile />}  />
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register-confirm" element={<RegisterConfirmed />}/>
                    <Route path="/theatre" element={<TheatreList />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/movies/:movieId" element={<MovieDetails />} />
                    <Route path="/order-confirm" element={<OrderConfirm />}/>
                    <Route path="/order-completed" element={<OrderCompleted />}/>
                    <Route path="/ongoing" element={<OnGoingSlider />}/>
                    <Route path="/comingSoon" element={<ComingSoon />}/>

                </Routes>
                <Footer />
            </div>
    );
}

export default App;
