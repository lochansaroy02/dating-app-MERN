import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {


  const navigate = useNavigate();

  return (
    <div className='flex flex-col  items-center  mt-32  h-screen'>
      <h1 className='text-8xl bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 bg-clip-text  font-bold text-transparent'>LoveVerse</h1>
      <p className='text-2xl '>A universe of love and connections.</p>
      <div className='flex gap-4 mt-8 '>
        <button onClick={() => {
          navigate('/signup');
        }} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          Sign Up
        </button>
        <button onClick={() => {
          navigate('/feed')
        }} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          Go to Feed
        </button>
      </div>

    </div>
  );
};

export default Home;
