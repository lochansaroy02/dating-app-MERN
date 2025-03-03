import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateProfile from './pages/CreateProfile';
import Feed from './pages/Feed';
import Home from './pages/Home';
import ImageUpload from './pages/ImageUpload';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './pages/Navbar';




const App = () => {




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

        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  )
}

export default App