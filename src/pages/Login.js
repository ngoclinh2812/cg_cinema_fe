import React, {useState, useEffect} from 'react';
import {Typography} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '.././features/auth/authActions';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo])
    
    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [navigate, userInfo])

    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        };
        dispatch(userLogin(data))
    }

    return (
        <div className="max-w-sm mx-auto bg-white p-8 my-8 rounded shadow-md">
            <h2 className="text-2xl mb-4">Sign In</h2>
            <form onSubmit={submitForm}>
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

// <form onSubmit={handleSubmit(submitForm)}>
//     <div className='form-group'>
//         <label htmlFor='email'>Email</label>
//         <input
//             type='email'
//             className="w-full px-3 py-2 border rounded"
//             placeholder="Enter your email"
//             {...login('email')}
//             required
//         />
//     </div>
//     <div className='form-group'>
//         <label htmlFor='password'>Password</label>
//         <input
//             type='password'
//             className="w-full px-3 py-2 border rounded"
//             placeholder="Enter password"
//             {...login('password')}
//             required
//         />
//     </div>
//     <button type='submit' className='button' disabled={loading}>
//         Login
//     </button>
// </form>

{/*<form onSubmit={handleSignIn}>*/}
{/*    <div className="mb-4">*/}
{/*        <label className="block mb-2" htmlFor="email">*/}
{/*            Email*/}
{/*        </label>*/}
{/*        <input*/}
{/*            type="email"*/}
{/*            id="email"*/}
{/*            className="w-full px-3 py-2 border rounded"*/}
{/*            placeholder="Enter your email"*/}
{/*            {...login('email')}*/}
{/*            // onChange={(e) => setEmail(e.target.value)}*/}
{/*            required*/}
{/*        />*/}
{/*    </div>*/}
{/*    <div className="mb-4">*/}
{/*        <label className="block mb-2" htmlFor="password">*/}
{/*            Password*/}
{/*        </label>*/}
{/*        <input*/}
{/*            type="password"*/}
{/*            id="password"*/}
{/*            className="w-full px-3 py-2 border rounded"*/}
{/*            placeholder="Enter your password"*/}
{/*            {...login('password')}*/}
{/*            // value={password}*/}
{/*            // onChange={(e) => setPassword(e.target.value)}*/}
{/*            required*/}
{/*        />*/}
{/*    </div>*/}
{/*    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>*/}
{/*        Login*/}
{/*    </button>*/}
{/*    <Typography variant="body2" className="text-indigo-500 mt-2">*/}
{/*        New here?{" "}*/}
{/*        <a href="/register" className="underline">*/}
{/*            Create an account*/}
{/*        </a>*/}
{/*    </Typography>*/}
{/*</form>*/}