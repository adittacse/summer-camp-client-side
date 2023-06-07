import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {Helmet} from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth.jsx";
import SocialLogin from "../Shared/SocialLogin/SocialLogin.jsx";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createUser, updateUserProfile, logOut} = useAuth();
    const navigate = useNavigate();
    
    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const createdUser = result.user;
                updateUserProfile(data.name, data.photoUrl)
                    .then( () => {
                        const saveUser = {
                            name: data.name,
                            email: data.email,
                            role: "subscriber"
                        };
                        fetch("http://localhost:3000/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User has been registered!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate("/login");
                                }
                            })
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.message,
                            footer: 'Something went wrong!',
                        });
                    })
                logOut()
                    .then( () => {})
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.message,
                            footer: 'Something went wrong!'
                        });
                    });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    footer: 'Something went wrong!'
                })
            })
    };
    
    return (
        <div>
            <Helmet>
                <title>Sign Up | TranquilZen</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content md:w-[35%]">
                    <div className="card md:w-full shadow-2xl bg-base-100">
                        <h1 className="text-5xl font-bold text-center mt-8">Sign Up</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-warning">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoUrl", { required: true })} name="photoUrl" placeholder="photoUrl" className="input input-bordered" />
                                {errors.photoUrl && <span className="text-warning">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.name && <span className="text-warning">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && <p className="text-warning">Password is required</p>}
                                {errors.password?.type === "minLength" && <p className="text-warning">Password must be 6 characters</p>}
                                {errors.password?.type === "maxLength" && <p className="text-warning">Password must be less than 20 characters</p>}
                                {errors.password?.type === "pattern" && <p className="text-warning">Password must have one uppercase, one lowercase, one number & one special character</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up"/>
                            </div>
                        </form>
                        <p className="text-center">Already registered? <Link to="/login">Go to log in</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;