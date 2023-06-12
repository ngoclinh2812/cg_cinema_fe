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
            <NavigationBar className='sticky'/>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-confirm" element={<RegisterConfirmed />}/>
                <Route path="/theatre" element={<TheatreList />} />
                <Route path="/movies/:title" element={<MovieDetails />}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
