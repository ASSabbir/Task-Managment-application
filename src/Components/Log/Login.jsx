import { Link, useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';

import Swal from 'sweetalert2';
import axios from 'axios';
import AuthContext, { MainContext } from '../../AuthContext';

const Login = () => {
    const { handelSignin } = useContext(MainContext)
    const [flag,setFlag]=useState(false)
    const navg = useNavigate()
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const handelSubmit = (e) => {
        e.preventDefault();
        setFlag(true)
        const email = e.target.email.value
        const password = e.target.password.value
        if (email === '' || password === '') {
            Toast.fire({
                icon: "error",
                title: 'All fields must be filled out.'
            });
            setFlag(false)
            return
        }
        
        handelSignin(email, password)
            .then(user2 => {
                Toast.fire({
                    icon: "success",
                    title: `WelCome `
                });
                console.log(user2)

                setFlag(false)
                navg('/alltask')

            })
            .catch(error => {
                console.log(error)
                Toast.fire({
                    icon: "error",
                    title: error.code
                });
                setFlag(false)
            })

    }
    
    return (
        <div className=" h-screen bg-color1 py-32 justify-center items-center flex">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl text-white bg-color2 ">
                        <h1 className="text-4xl text- font-bold text-center">Login</h1>
                        <form onSubmit={handelSubmit} className="space-y-6">
                            <div className="space-y-1 text-sm">
                                <label className="block ">Email</label>
                                <input type="text" name="email" placeholder="email" className="w-full px-4 py-3 rounded-md  border-2 bg-gray-200 text-black  " />
                            </div>
                            <div className="space-y-1 text-sm">
                                <label className="block ">Password</label>
                                <input type="password" name="password" placeholder="Password" className="w-full border-2 px-4 py-3 rounded-md  text-black bg-gray-200  " />

                            </div>
                            <button  className="block w-full p-3 text-center hover:bg-color1 rounded-sm text-gray-50 bg-color4 duration-200">
                                        Sign In
                                    </button>
                        </form>
                        
                        <p className="text-xs text-center sm:px-6 ">Dont have an account?
                            <Link to={'/register'} className="underline ">Sign up</Link>
                        </p>
                    </div>
        </div>
    );
};

export default Login;