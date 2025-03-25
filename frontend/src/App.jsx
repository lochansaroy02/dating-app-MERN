import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Card from './pages/Card';
import Chat from './pages/Chat';
import CreateProfile from './pages/CreateProfile';
import Error from './pages/Error';
import Feed from './pages/Feed';
import Footer from './pages/Footer';
import Home from './pages/Home';
import ImageUpload from './pages/ImageUpload';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Task from './pages/Task';
import { useSocketStore } from './utils/store';




const App = () => {


  const { connectSocket, onlineUser } = useSocketStore();

  const authChecker = () => {
    const token = localStorage.getItem("token")
    if (token) {
      connectSocket();
    }
  }



  useEffect(() => {
    authChecker();
  }, [])


  return (




    <Router>
      {/* intact thing will be here */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/image" element={<ImageUpload />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/task" element={<Task />} />
        <Route path="/card" element={<Card />} />
        <Route path="*" element={<Error />} />

        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App