import React from 'react';
import {Avatar, Button, Dropdown} from 'flowbite-react';

const Profile = ({ onLogout }) => {
    return (
        <>
            <div className="flex md:order-2">
                <Dropdown inline label={
                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                } >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item> {/* Call onLogout prop */}
                </Dropdown>
            </div>
        </>
    );
};

export default Profile;
