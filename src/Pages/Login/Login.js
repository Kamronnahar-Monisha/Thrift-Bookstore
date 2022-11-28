import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import './Login.css';
import { FaGoogle } from 'react-icons/fa';
import loginImg from '../../images/Sign in.gif';
import useToken from '../../hooks/useToken';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {Helmet} from 'react-helmet-async';

const Login = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const { signInWithGoogle, logInWithEmailAndPassword } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        setLoginError('');
        logInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                reset();
                setLoginUserEmail(data.email);
            })
            .catch((error) => {
                setLoginError(error.message);
            });
    }


    const handleGoogleSignIN = () => {
        setLoginError('');
        signInWithGoogle()
            .then((result) => {
                const { displayName, email } = result.user;
                saveUser(displayName, email, 'buyer');
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    const saveUser = (name, email, role) => {
        const user = {
            name,
            email,
            role,
            "verified": false
        };
        fetch('https://thrift-bookstore-server-side.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setLoginUserEmail(email);
            })
    }

    return (
        <div className='container py-5'>
            <Helmet>
                <title>Please Login</title>
            </Helmet>
            <div className="row justify-content-around align-items-center pb-5 pt-4 gy-5">
                <div className="col-lg-5">
                    <img src={loginImg} alt="A girl log in a website" className='w-100' />
                </div>
                <div className="col-lg-5">
                    <div className='rounded p-5 theme-color-shadow'>
                        <h3 className='theme-color fw-bolder'>Please Sign In !!</h3>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-muted fw-bold">Email address</label>
                                <input type="email" {...register("email", {
                                    required: "Email Address is required"
                                })} className="form-control" id="email" />
                                {errors.email && <p className='text-danger'>{errors.email?.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-muted fw-bold">Password</label>
                                <input type="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })} className="form-control" id="password" />
                                {errors.password && <p className='text-danger'>{errors.password?.message}</p>}
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label text-muted" htmlFor="exampleCheck1 ">Remember me</label>
                            </div>
                            <button type="submit" className="theme-button rounded form-control">Sign In</button>
                            <div>
                                {loginError && <p className='text-red-600'>{loginError}</p>}
                            </div>
                        </form>
                        <div className='text-muted my-3 text-center'>
                            Don't have a account ? Please <Link to='/Register' className='register-login-link text-decoration-none theme-color fw-bold'>Register</Link>
                        </div>
                        <button onClick={handleGoogleSignIN} type="submit" className="theme-button-outline  py-2 rounded form-control mb-3">Sign In with  <FaGoogle /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;