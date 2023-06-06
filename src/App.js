import './App.css';
import Footer from "./components/Footer";
import NavigationBar from "./components/navigation/NavigationBar";
import Homepage from "./pages/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
        <NavigationBar className='bg-transparent'/>
        <Routes>
            <Route index element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
