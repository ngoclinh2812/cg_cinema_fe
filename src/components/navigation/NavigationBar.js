import React, { useEffect, useState } from 'react';
import logo from '../../asset/images/codegym-logo.jpg';
import { Navbar } from 'flowbite-react';
import { MovieNavList, StoreNavList, TheatreNavList } from './navList';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const NavigationBar = () => {
    const [scrollNav, setScrollNav] = useState(false);

    useEffect(() => {
        let timeoutId;

        const changeNavBackground = () => {
            setScrollNav(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setScrollNav(false), 1000); // Change back to transparent after 3 seconds of no scrolling
        };

        const resetNavBackground = () => {
            clearTimeout(timeoutId);
            setScrollNav(false);
        };

        window.addEventListener('scroll', changeNavBackground);
        window.addEventListener('mousemove', resetNavBackground);

        return () => {
            window.removeEventListener('scroll', changeNavBackground);
            window.removeEventListener('mousemove', resetNavBackground);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <Navbar
            fluid
            className={`text-blue-500 z-50 fixed w-full  ${
                !scrollNav ? 'bg-opacity-0' : 'bg-opacity-1 bg-blue-500'
            }`}
            style={{ alignItems: 'center' }}
        >
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    <Navbar.Brand href="/">
                        <img alt="Flowbite React Logo" className="mr-3 h-6 sm:h-9" src={logo} />
                        <span className="self-center whitespace-nowrap text-xl font-semibold mr-4">CG Cinema</span>
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
                    <Link
                        to="/login"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        <span className=' flex items-center'>

                        <FaUser className="text-lg mr-2"/>
                        <span className="hidden md:inline">Join Use Now!</span>
                        </span>
                    </Link>
                </div>
            </div>
        </Navbar>
    );
};

export default NavigationBar;
