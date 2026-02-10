import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Component } from 'react';

import Expore from './Components/Explore/Explore.jsx';
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import Feed from './Components/Feed/Feed.jsx';
import CreatePost from './Components/Posts/CreatePost.jsx';
import Post from './Components/Posts/Post.jsx';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/explore" element={<Expore />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path='/post' element={<Post />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
