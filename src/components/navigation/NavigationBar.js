import React, { useEffect, useState } from 'react';
import logo from '../../asset/images/codegym-logo.jpg';
import {  Navbar } from "flowbite-react";
import { MovieNavList, StoreNavList, TheatreNavList } from "./navList";
import {Link} from "react-router-dom";

const NavigationBar = () => {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    return (
        <Navbar
            fluid
            rounded
            className="bg-transparent text-blue-500 sticky inset-0 z-50 "
        >
            <Navbar.Brand href="/">
                <img
                    alt="Flowbite React Logo"
                    className="mr-3 h-6 sm:h-9"
                    src={logo}
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold">
          CG Cinema
        </span>
            </Navbar.Brand>

            <Navbar.Collapse>
                <Navbar.Link className="mr-4">
                    <MovieNavList />
                </Navbar.Link>
                <Navbar.Link className="mr-4">
                    <TheatreNavList />
                </Navbar.Link>
                <Navbar.Link className="mr-4">
                    <StoreNavList />
                </Navbar.Link>
            </Navbar.Collapse>

            <div className="flex items-center md:order-2">
                <Link to='/login' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Join Us Now!
                </Link>
                <Navbar.Toggle />
            </div>
        </Navbar>
    );
};

export default NavigationBar;
