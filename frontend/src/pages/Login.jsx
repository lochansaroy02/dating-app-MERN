import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsLoggedStore, useThisUserStore } from '../utils/store';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const setIsLoggedIn = useIsLoggedStore((state) => state.setIsLoggedIn);

    const setThisUserData = useThisUserStore((state) => state.setThisUserData)

    const handleLogin = async (e) => {
        e.preventDefault();

        try {



            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
            setThisUserData(data.userData);
            navigate('/create')

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    }, [])
    return (
        <div>
            <section className="bg-neutral-50 h-screen  dark:bg-neutral-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-white">
                                Log In to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="enter password"
                                        className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-neutral-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Log In
                                </button>
                                <div className=' flex  justify-center'>

                                    <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                                        Don't have account?{' '}
                                        <button
                                            onClick={() => navigate('/signup')}
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            SignUp here
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login