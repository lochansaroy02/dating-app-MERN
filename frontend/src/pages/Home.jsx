import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketStore, useUserStore } from "../utils/store";

const Home = () => {

  const setUserData = useUserStore((state) => state.setUserData);

  const { authUser, onlineUser } = useSocketStore()
  const apiUrl = import.meta.env.VITE_API_URL;

  const getUser = async () => {
    try {
      const response = await axios.get(apiUrl + '/user/get');
      const data = await response.data;
      setUserData(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, [])
  const navigate = useNavigate();

  return (
    <div className='flex flex-col  items-center  mt-32  h-screen'>
      <h1 className='lg:text-8xl  text-6xl bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 bg-clip-text  font-bold text-transparent'>LoveVerse</h1>
      <p className='lg:text-2xl text-xl'>A universe of love and connections.</p>
      <div className='flex gap-4 mt-8 '>



        <button onClick={() => {
          const token = localStorage.getItem("token")
          !token ?
            navigate('/signup') : navigate("/feed")
        }} className='bg-blue-500  cursor-pointer text-white px-4 py-2 rounded-md'>
          {localStorage.getItem("token") ? "Go to feed" : "Sign Up"}
        </button>


      </div>

    </div>
  );
};

export default Home;
