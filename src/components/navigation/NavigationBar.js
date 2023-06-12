import React, {useEffect, useState} from 'react';
import logo from '../../asset/images/codegym-logo.jpg';
import { Navbar } from 'flowbite-react';
import { MovieNavList, StoreNavList, TheatreNavList } from './NavList';
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const NavigationBar = ({ loggedIn, onLogout }) => {
    const [scrollNav, setScrollNav] = useState(false);
    const location = useLocation();

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
                    {loggedIn ? (
                        <Profile onLogout={onLogout} />
                    ) : (
                        <Link
                            to="/login"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
              <span className="hidden md:flex items-center">
                <FaUser className="text-lg mr-2" />
                <span>Join Us Now!</span>
              </span>

                            <FaUser className="text-lg md:hidden " />
                        </Link>
                    )}
                </div>
            </div>
        </Navbar>
    );
};

const Profile = ({ onLogout }) => {
    const handleLogout = () => {
        // Perform logout logic, e.g., clearing session, etc.
        onLogout();
    };

    return (
        <>
            <div className="flex md:order-2">
                {/* Profile Dropdown or Content */}
                <Link to="/profile" className="text-white mr-4">
                    Profile
                </Link>
                <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                    Sign Out
                </button>
            </div>
        </>
    );
};

export default NavigationBar;
