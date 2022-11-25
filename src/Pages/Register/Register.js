import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import './Register.css';
import registerImg from '../../images/Sign up.gif';

const Register = () => {
    const [errorMassage, setErrorMassage] = useState({});
    const { createUser, createProfile } = useContext(AuthContext);
    const navigate = useNavigate();




    const handleRegisterFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const fullName = form.fullName.value;
        const photoUrl = form.photoUrl.value;

        createUser(email, password)
            .then((userCredential) => {
                setErrorMassage({
                    massage: 'You are successfully signed up .',
                    error: false
                });
                createProfileInformation(fullName, photoUrl);
                form.reset();
                navigate('/');
            })
            .catch((error) => {
                setErrorMassage({
                    massage: error?.message,
                    error: true
                });
            })

    }

    const createProfileInformation = (fullName, photoURL) => {
        const profile = {
            displayName: fullName,
            photoURL: photoURL
        }
        createProfile(profile)
            .then(() => {
            })
            .catch((error) => {
                console.log(error.message);
            })
    }


    return (
        <div className='container py-5'>
            <div className="row justify-content-around align-items-center pb-5 pt-4 gy-5">
                <div className="col-lg-5">
                    <img src={registerImg} alt="A girl log in a website" className='w-100' />
                </div>
                <div className="col-lg-5">
                    <div className='theme-color-shadow rounded p-5'>
                        <h3 className='theme-color fw-bolder'>Please Register Your Account !!</h3>
                        <form onSubmit={handleRegisterFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label text-muted fw-bold">Full Name</label>
                                <input type="text" name='fullName' className="form-control" id="fullName" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="photoUrl" className="form-label text-muted fw-bold"> Photo URL</label>
                                <input type="text" name='photoUrl' className="form-control" id="photoUrl" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mail" className="form-label text-muted fw-bold">Email address</label>
                                <input type="email" name='email' className="form-control" id="mail" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label text-muted fw-bold">Password</label>
                                <input type="password" name='password' className="form-control" id="Password" required />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="condition" required />
                                <label className="form-check-label text-muted" htmlFor="condition ">Accept term and condition</label>
                            </div>
                            <div className="mb-3">
                                <p className={errorMassage.error ? 'text-danger' : 'text-success'}>{errorMassage.massage}</p>
                            </div>
                            <button type="submit" className="theme-button rounded form-control">Sign Up</button>
                        </form>
                        <div className='text-muted my-3 text-center'>
                            Already have an account? Please <Link to='/login' className='theme-color text-decoration-none fw-bold register-login-link'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;