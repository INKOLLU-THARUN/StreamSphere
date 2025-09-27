 // src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Movies from './Movies';
import TVShows from './TVShows';
import Login from './Login';
import SignUp from './SignUp';
import Contact from './Contact';
import './App.css';
import './Project.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/about" element={<About />} />
        <Route path="/movies" element={<Movies searchQuery={searchQuery} />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home searchQuery={searchQuery} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;