import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useThisUserStore } from '../utils/store';

const Navbar = () => {


    const param = useParams();
    const data = useThisUserStore((state) => state.thisUserData);

    const token = localStorage.getItem('token');
    const thisUserData = localStorage.getItem('thisUserData');
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
            <div className='flex  items-center  gap-4 '>

                <div>
                    <button onClick={handleClick} className='bg-neutral-800 px-2 py-1 rounded-lg text-sm  '>{token ? "Logout" : "Login"}</button>
                </div>

                {token &&
                    <div onClick={() => {
                        navigate('/profile')
                    }} className='w-10 h-10 rounded-full cursor-pointer'>
                        <img className='rounded-full w-10 h-10' src={data?.data?.images[0]} alt="" />
                    </div>
                }



            </div>
        </div>
    )
}

export default Navbar