import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import './Login.css';
import { FaGoogle } from 'react-icons/fa';
import loginImg from '../../images/Sign in.gif';

const Login = () => {
    const [message, setMessage] = useState(null);
    const { signInWithGoogle, logInWithEmailAndPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";


    const handleLogInButton = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                setMessage('Successfully logged in!');
                form.reset();
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setMessage(error?.message);
            });
    }


    const handleGoogleSignIN = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            })
    }

    return (
        <div className='container py-5'>
            <div className="row justify-content-around align-items-center pb-5 pt-4 gy-5">
                <div className="col-lg-5">
                    <img src={loginImg} alt="A girl log in a website" className='w-100' />
                </div>
                <div className="col-lg-5">
                    <div className='rounded p-5 theme-color-shadow'>
                        <h3 className='theme-color fw-bolder'>Please Sign In !!</h3>
                        <form onSubmit={handleLogInButton}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-muted fw-bold">Email address</label>
                                <input type="email" name='email' className="form-control" id="email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-muted fw-bold">Password</label>
                                <input type="password" name="password" className="form-control" id="password" required />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label text-muted" htmlFor="exampleCheck1 ">Remember me</label>
                            </div>
                            <div className="mb-3">
                                <p className='text-warning'>{message}</p>
                            </div>
                            <button type="submit" className="theme-button rounded form-control">Sign In</button>
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