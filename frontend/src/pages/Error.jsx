import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen  flex flex-col  justify-center items-center   text-white '>
            <div className='flex flex-col gap-2  items-center  '>
                <h1 className='text-8xl'>404</h1>
                <h2 className='text-4xl '>Page Not Found</h2>
            </div>
            <button onClick={() => {
                navigate('/')
            }} className=' bg-blue-500 mt-4  text-white px-4 py-2 rounded-md'>Go to Home </button>
        </div >
    )
}

export default Error;