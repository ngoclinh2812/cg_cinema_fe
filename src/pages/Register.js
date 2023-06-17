import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SpinnerLoading from '../components/SpinnerLoading';

import { checkDuplicateEmail, checkDuplicatePhone, checkDuplicateUsername, registerUser } from '../api/userAPI';
import { registerFailure, registerStart, registerSuccess } from '../features/registrationSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.registration);
    const navigate = useNavigate();
    localStorage.removeItem('token');

    const initialValues = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phone: Yup.string().required('Phone is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values) => {
        dispatch(registerStart());

        try {
            const data = await registerUser(values);
            dispatch(registerSuccess());
            console.log(data);
            navigate('/login');
        } catch (error) {
            dispatch(registerFailure('Failed to register. Please try again.'));
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <>
            <div className=" mx-auto bg-white p-8 my-4 rounded shadow-md">
                {loading && <SpinnerLoading />}
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <h2 className="text-2xl mb-4">Register</h2>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            <Form className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="firstName">First Name</label>
                                        <Field
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                        <ErrorMessage name="firstName" component="span" className="text-red-500" />
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Field
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                        <ErrorMessage name="lastName" component="span" className="text-red-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <Field type="text" id="phone" name="phone" className="w-full border border-gray-300 rounded px-3 py-2" />
                                    <ErrorMessage name="phone" component="span" className="text-red-500" />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <ErrorMessage name="email" component="span" className="text-red-500" />
                                </div>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <ErrorMessage name="username" component="span" className="text-red-500" />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="password">Password</label>
                                        <div className="relative">
                                            <Field
                                                type={passwordVisible ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                className="w-full border border-gray-300 rounded px-3 py-2"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {passwordVisible ?
                                                    <>
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor"
                                                             viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                                            </path>
                                                        </svg>
                                                    </>
                                                    :
                                                    <>
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor"
                                                             viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                                                            </path>
                                                        </svg>
                                                    </>
                                                }
                                            </button>
                                        </div>
                                        <ErrorMessage name="password" component="span" className="text-red-500"/>
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <div className="relative">
                                            <Field
                                                type={confirmPasswordVisible ? 'text' : 'password'}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className="w-full border border-gray-300 rounded px-3 py-2"
                                            />
                                            <span
                                                className="absolute top-2 right-2 cursor-pointer"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                            {confirmPasswordVisible ?
                                                <>
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                                        </path>
                                                    </svg>

                                                </>
                                                :
                                                <>
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                                                        </path>
                                                    </svg>
                                                </>
                                            }
                                        </span>
                                        </div>
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="span"
                                            className="text-red-500"
                                        />
                                    </div>
                                </div>
                                {error && <div className="text-red-700 bg-red-500"><p>{error}</p></div>}
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded "
                                    disabled={loading}
                                >
                                    Create Account
                                </button>
                                {success && (
                                    <p className="text-green-500">Registration successful! Please proceed to the login page.</p>
                                )}
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;