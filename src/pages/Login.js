import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Typography} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../features/loginSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { userInfo } = login(email, password);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(login(values.username, values.password));
            setSubmitting(false);
            navigate('/');
            console.log('login successfully');
        } catch (error) {
            setSubmitting(false);
        }
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

        return (
            <div className="max-w-sm mx-auto bg-white p-8 my-8 rounded shadow-md">
                <h2 className="text-2xl mb-4">Sign In</h2>
                <Formik
                    initialValues={{username: '', password: ''}}
                    validate={(values) => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = 'Username is required';
                        }
                        if (!values.password) {
                            errors.password = 'Password is required';
                        }
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="username">
                                    Username
                                </label>
                                <Field
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Enter your username"
                                />
                                <ErrorMessage name="username" component="p" className="text-red-500 mt-2"/>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="password">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" component="p" className="text-red-500 mt-2"/>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                                disabled={isSubmitting}
                            >
                                Sign In
                            </button>
                            <Typography variant="body2" className="text-indigo-500 mt-2">
                                New here?{' '}
                                <a href="/register" className="underline">
                                    Create an account
                                </a>
                            </Typography>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    };

export default Login;