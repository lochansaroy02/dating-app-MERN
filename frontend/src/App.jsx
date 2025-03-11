import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateProfile from './pages/CreateProfile';
import Feed from './pages/Feed';
import Home from './pages/Home';
import ImageUpload from './pages/ImageUpload';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Footer from './pages/Footer';
import Task from './pages/Task';
import Card from './pages/Card';




const App = () => {


  const data = localStorage.getItem('user');
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data])

  return (




    <Router>
      {/* intact thing will be here */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/image" element={<ImageUpload />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/task" element={<Task />} />
        <Route path="/card" element={<Card />} />



        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App