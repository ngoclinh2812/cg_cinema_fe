import React, {useEffect, useState} from 'react';
import logo from '../../asset/images/codegym-logo.jpg';
import { Navbar } from 'flowbite-react';
import { MovieNavList, StoreNavList, TheatreNavList } from './NavList';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import jwtDecode from "jwt-decode";


const NavigationBar = ({ loggedIn, onLogout }) => {
    const [scrollNav, setScrollNav] = useState(false);
    const location = useLocation();
    const token = localStorage.getItem('token');
    let userName = '';
    // localStorage.removeItem('token');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userName = decodedToken.username;
            console.log(userName);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY < 10;
            setScrollNav(!isTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navbarClassName = `text-white-500 z-50 w-full bg-opacity-1 ${
        location.pathname === '/' ? 'fixed' : 'sticky top-0 mb-4'
    } ${location.pathname === '/' && !scrollNav ? 'bg-opacity-0' : ''}`;


    return (
        <Navbar fluid className={navbarClassName} style={{ alignItems: 'center', backgroundColor: '#272882' }}>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    <Navbar.Brand href="/">
                        <img alt="Flowbite React Logo" className="mr-3 h-6 sm:h-9" src={logo} />
                        <span className="self-center whitespace-nowrap text-xl font-semibold mr-4 text-white">CG Cinema</span>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Navbar.Link className="mr-4">
                            <MovieNavList />
                        </Navbar.Link>
                        <Navbar.Link className="mr-4">
                            <a href="/theatre">
                                <TheatreNavList />
                            </a>
                        </Navbar.Link>
                        <Navbar.Link className="mr-4">
                            <StoreNavList />
                        </Navbar.Link>
                    </Navbar.Collapse>
                </div>

                <div className="flex items-center md:order-2">
                    {token ? (
                        <Profile onLogout={onLogout} />
                    ) : (
                        <Link
                            to="/login"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            {token ? (
                                <span className="hidden md:flex items-center">
                                  <FaUser className="text-lg mr-2" />
                                  <span>{userName}</span>
                                </span>
                            ) : (
                                <>
                                    <FaUser className="text-lg md:hidden " />
                                    <span>Join Us Now!</span>
                                </>
                            )}
                        </Link>
                    )}
                </div>
            </div>
        </Navbar>
    );
};

const Profile = ({ onLogout, username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        onLogout();
    };

    return (
        <>
            <div className="flex md:order-2">
                {/* Profile Dropdown or Content */}
                <Link to="/profile" className="text-white mr-4">
                    <button className="text-white bg-red-600 hover:bg-white-700 font-medium rounded-lg text-sm px-5 py-2.5">
                        Profile
                    </button>
                </Link>

                <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                    Sign Out
                </button>
            </div>
        </>
    );
};

export default NavigationBar;
