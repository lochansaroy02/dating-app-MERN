import React, { useEffect } from 'react';
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import icon from "../images/icon.png";
import { useProfileStore, useSocketStore, useThisUserStore } from '../utils/store';

const Navbar = () => {


    const param = useParams();
    const data = useThisUserStore((state) => state.thisUserData);
    const setThisUserData = useThisUserStore((state) => state.setThisUserData);
    const { thisUserData } = useThisUserStore();
    const { setProfileData } = useProfileStore();

    const imageArr = data?.images?.[0]?.split(',');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const { disconnectSocket } = useSocketStore()
    const handleClick = () => {

        if (token) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            setThisUserData(null);
            toast.success('logged out');
            disconnectSocket();
            navigate('/');
            window.location.reload();
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        // console.log(imageArr)
    }, [])

    return (
        <div className='bg-neutral-950    fixed z-40  top-0 h-14 border-b  border-neutral-600  flex justify-between px-4 items-center w-full '>

            <div onClick={() => {

                navigate('/')
                if (window.innerWidth < 768) {
                    navigate(`/feed`);
                }
            }} className='cursor-pointer flex  items-center '>
                <div className='h-10 w-10 '>

                    <img className='w-full h-full' src={icon} alt="" />
                </div>
                <h1 className='text-2xl bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 bg-clip-text  font-bold text-transparent'>Love Verse</h1>
            </div>
            <div className='flex  items-center  gap-4 '>

                <div>
                    <button onClick={handleClick} className='bg-neutral-800  cursor-pointer   px-2 py-1 rounded-lg text-sm   '>{token ? "Logout" : "Login"}</button>
                </div>

                {token && imageArr?.[0] &&
                    <div onClick={() => {
                        setProfileData(thisUserData)
                        navigate("/profile")
                    }} className='w-10 h-10 rounded-full cursor-pointer'>
                        <img className='rounded-full object-cover -rotate-90 w-10 h-10' src={imageArr?.[0]} alt="" />
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar