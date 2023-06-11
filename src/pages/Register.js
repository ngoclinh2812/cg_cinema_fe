import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {registerUser, userLogin} from "../features/auth/authActions";

const Register = () => {

    // username, lastName, firstName, email, phone, password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { loading, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            username,
            lastName,
            firstName,
            email,
            phone,
            password
        };
        dispatch(registerUser(data));
    };

    // redirect authenticated user to the login page
    useEffect(() => {
        if (userInfo) {
            navigate("/login"); // Update the path to "/"
        }
    }, [userInfo]);

    return (
        <div className="max-w-sm mx-auto bg-white p-8 my-8 rounded shadow-md">
            <h2 className="text-2xl mb-4">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="first-name">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first-name"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Your firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="last-name">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last-name"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Your lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Your phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;