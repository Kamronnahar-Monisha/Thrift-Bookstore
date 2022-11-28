import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import './Register.css';
import registerImg from '../../images/Sign up.gif';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [signUpError, setSignUPError] = useState('');
    const { createUser, createProfile } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }


    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then((result) => {
                reset();
                toast.success('User Created Successfully.');
                console.log(data);
                createProfileInformation(data.name, data.photoUrl, data);
            })
            .catch((error) => {
                setSignUPError(error.message);
            })

    }

    const createProfileInformation = (name, photoURL, data) => {
        const profile = {
            displayName: name,
            photoURL
        }
        createProfile(profile)
            .then(() => {
                saveUser(data.name, data.email, data.role);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }


    const saveUser = (name, email, role) => {
        const user = { name, email, role, "verified": false };
        fetch('https://thrift-bookstore-server-side.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
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
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label text-muted fw-bold">Full Name</label>
                                <input type="text" {...register("name", {
                                    required: "Name is Required"
                                })} className="form-control" id="fullName" />
                                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="photoUrl" className="form-label text-muted fw-bold"> Photo URL</label>
                                <input type="text" {...register("photoUrl", {
                                    required: "Photo Url is Required"
                                })} className="form-control" id="photoUrl" />
                                {errors.photoUrl && <p className='text-danger'>{errors.photoUrl.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mail" className="form-label text-muted fw-bold">Email address</label>
                                <input type="email" {...register("email", {
                                    required: "email is Required"
                                })} className="form-control" id="mail" />
                                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label text-muted fw-bold">Password</label>
                                <input type="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[0-9])/, message: 'Password must have uppercase character and number' }
                                })} className="form-control" id="Password" />
                                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label text-muted fw-bold">Choose Your Role</label>
                                <select  {...register('role', { required: "User type is required" })} className="form-select" aria-label="Default select" id="role">
                                    <option value="buyer" selected>Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                                {errors.role && <p className='text-danger'>{errors.role.message}</p>}
                            </div>

                            <div className="mb-3 form-check">
                                <input type="checkbox" {...register("condition", {
                                    required: "Term and condition should be accepted"
                                })} className="form-check-input" id="condition" />
                                <label className="form-check-label text-muted" htmlFor="condition ">Accept term and condition</label>
                                {errors.condition && <p className='text-danger'>{errors.condition.message}</p>}
                            </div>
                            <button type="submit" className="theme-button rounded form-control">Sign Up</button>
                            {signUpError && <p className='text-danger'>{signUpError}</p>}
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