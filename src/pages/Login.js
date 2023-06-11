import React, {useState} from 'react';
import {Typography} from "@material-tailwind/react";
import {setLoggingIn} from "../features/loginSlice";
import {setError} from "../features/userSlice";
import {loginUser} from "../api/userAPI";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const loggingIn = useSelector((state) => state.login.loggingIn);
    const error = useSelector((state) => state.login.error);

    const handleLogin = async (event) => {
        event.preventDefault();

        // Login form data retrieval
        const { username, password } = event.target.elements;

        // Login user
        dispatch(setLoggingIn(true));
        try {
            await loginUser({
                username: username.value,
                password: password.value,
            });
            dispatch(setError(null));
            // Login success, redirect or show success message
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoggingIn(false));
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white p-8 my-8 rounded shadow-md">
            <h2 className="text-2xl mb-4">Sign In</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
                    Sign In
                </button>
                <Typography variant="body2" className="text-indigo-500 mt-2">
                    New here?{" "}
                    <a href="/register" className="underline">
                        Create an account
                    </a>
                </Typography>
            </form>
        </div>

    );
};

export default Login;