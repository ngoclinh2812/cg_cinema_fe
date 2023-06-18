import React from 'react';
import {Dropdown} from "flowbite-react";
import {Link} from "react-router-dom";


export const MovieNavList = () => {
    return(
        <>
            <div className="flex items-center gap-4">
                <Dropdown
                    label="Movies"
                    size="sm"
                >
                    <Dropdown.Item>
                        <Link to={`/ongoing`} className="block">Ongoing</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to={`/comingSoon`} className="block">ComingSoon</Link>
                    </Dropdown.Item>
                </Dropdown>

            </div>
        </>
    )
}
export const TheatreNavList = () => {
    return(
        <>
            <div className="flex items-center gap-4">
                <Dropdown
                    label="Theatres"
                    size="sm"
                >
                    <Dropdown.Item>
                        Theatres Near You!
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Find a Theatre
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </>
    )
}
export const StoreNavList = () => {
    return(
        <>
            <div className="flex items-center gap-4">
                <Dropdown
                    label="Store"
                    size="sm"
                    className="bg-white"
                >
                    <Dropdown.Item>
                        Foods and Beverages
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Gift Cards
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Merch
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </>
    )
}