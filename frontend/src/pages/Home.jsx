import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketStore, useThisUserStore, useUserStore } from "../utils/store";

const Home = () => {

  const setUserData = useUserStore((state) => state.setUserData);

  const { authUser, onlineUser } = useSocketStore()

  useEffect(() => {
    console.log(authUser);
    // console.log(onlineUser)
  }, [authUser])
  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/get');
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
      <h1 className='text-8xl bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 bg-clip-text  font-bold text-transparent'>LoveVerse</h1>
      <p className='text-2xl '>A universe of love and connections.</p>
      <div className='flex gap-4 mt-8 '>
        <button onClick={() => {
          navigate('/signup');
        }} className='bg-blue-500  cursor-pointer text-white px-4 py-2 rounded-md'>
          Sign Up
        </button>
        <button onClick={() => {
          navigate('/feed')
        }} className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md'>
          Go to Feed
        </button>
        <button onClick={() => {
          navigate('/chat')
        }} className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md'>
          chat
        </button>
        <button onClick={() => {
          navigate('/create')
        }} className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md'>
          Create
        </button>
      </div>

    </div>
  );
};

export default Home;
