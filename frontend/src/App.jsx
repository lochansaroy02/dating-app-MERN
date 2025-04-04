import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Card from './pages/Card';
import Chat from './pages/Chat';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './pages/EditProfile';
import Error from './pages/Error';
import Feed from './pages/Feed';
import Footer from './pages/Footer';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import ImageUpload from './pages/ImageUpload';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Task from './pages/Task';
import NavMenu from './pages/mobile/NavMenu';
import { useSocketStore } from './utils/store';




const App = () => {
  const token = localStorage.getItem("token")
  const { connectSocket, onlineUser } = useSocketStore();
  const authChecker = (token) => {
    if (token) {
      connectSocket();
    } else {
      // toast.error("Please login again", { icon: "⚠️" })
    }

  }



  useEffect(() => {
    authChecker(token);
  }, [])


  return (

    <div className='relative '>




      <Router>
        <Toaster position='top-center' />
        {/* intact thing will be here */}
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />

          {/* <Route path="/" element={<EditProfile />} /> */}
          <Route path="/" element={!token ? <Home /> : <HomePage />} />
          <Route path="/create" element={<CreateProfile />} />
          <Route path="/image" element={<ImageUpload />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/task" element={<Task />} />
          <Route path="/card" element={<Card />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<Error />} />

          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        </Routes>
        <Footer />
        <NavMenu />
      </Router>
    </div>
  )
}

export default App