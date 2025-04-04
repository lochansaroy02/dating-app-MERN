import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketStore, useUserStore } from "../utils/store";

const Home = () => {


  const { authUser, onlineUser } = useSocketStore()



  const navigate = useNavigate();

  return (
    <div className='flex flex-col  items-center  pt-32  gap-2 h-screen'>
      <h1 className='lg:text-8xl  text-6xl bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 bg-clip-text  font-bold text-transparent'>LoveVerse</h1>
      <p className='lg:text-2xl text-xl'>A universe of love and connections.</p>
      <div className='flex gap-4 mt-8 '>



        <button onClick={() => {
          const token = localStorage.getItem("token")
          !token ?
            navigate('/signup') : navigate("/feed")
        }} className='bg-neutral-700  cursor-pointer text-white px-4 py-2 rounded-md'>
          {localStorage.getItem("token") ? "Go to feed" : "Sign Up"}
        </button>


      </div>
      <p className="mt-2 text-sm lg:text-lg px-4  text-neutral-400 text-wrap">इस वेबसाइट  के सभी उपभोक्ता काल्पनिक है जिनका  वास्तविकता से कोई सम्बन्ध नहीं है।  </p>
    </div>
  );
};

export default Home;
