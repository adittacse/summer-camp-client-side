import React from 'react';
import {FaFacebookF, FaGithub, FaGoogle} from "react-icons/fa";
import Swal from "sweetalert2";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";

const SocialLogin = () => {
    const {googleSignIn, githubSignIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || "/";
    
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                const saveUser = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    role: "Student"
                };
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then( () => {
                        Swal.fire({
                            title: 'Login Successful!',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        });
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: error.message,
                //     footer: 'Something went wrong!'
                // })
            })
    }
    
    const handleGithubSignIn = () => {
        githubSignIn()
            .then(result => {
                const loggedUser = result.user;
                const email = loggedUser.reloadUserInfo.providerUserInfo[0].screenName;
                const saveUser = {
                    name: loggedUser.displayName,
                    email: email,
                    role: "Student"
                };
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then( () => {
                        Swal.fire({
                            title: 'Login Successful!',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        });
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        // Swal.fire({
                        //     icon: 'error',
                        //     title: 'Oops...',
                        //     text: error.message,
                        //     footer: 'Something went wrong!'
                        // })
                    })
            })
    }
    
    return (
        <div>
            <div className="divider mt-6 mb-6">Or sign in with</div>
            <div className="flex justify-center mb-6">
                <button onClick={handleGoogleSignIn} className="btn btn-circle hover:bg-red-600 text-white mr-4">
                    <FaGoogle></FaGoogle>
                </button>
                <button onClick={handleGithubSignIn} className="btn btn-circle hover:bg-red-600 text-white">
                    <FaGithub></FaGithub>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;