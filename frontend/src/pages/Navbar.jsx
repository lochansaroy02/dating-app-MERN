import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Navbar = () => {


    const param = useParams();


    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleClick = () => {
        if (token) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            navigate('/');
        } else {
            navigate('/login');
        }
    }


    return (
        <div className='bg-neutral-950  h-14 border-b  border-neutral-600  flex justify-between px-4 items-center w-full '>

            <div onClick={() => {
                navigate('/')
            }} className='cursor-pointer '>
                <h1 className='text-2xl bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 bg-clip-text  font-bold text-transparent'>LoveVerse</h1>
            </div>
            <div>
                <button onClick={handleClick} className='bg-neutral-800 px-2 py-1 rounded-lg text-sm  '>{token ? "Logout" : "Login"}</button>
            </div>
        </div>
    )
}

export default Navbar