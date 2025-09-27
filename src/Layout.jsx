// Layout.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Project.css';
import logo from './ass_processed.jpg';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="menu_bar">
        <img className="logo-img" src={logo} alt="LOGO" />
        <h1 className="logo">Stream <span>Sphere</span></h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/tvshows">TV Shows</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="search-container">
          <input type="text" placeholder="Search here..." />
          <button>Search</button>
        </div>
        <button className="login-btn" onClick={() => navigate('/login')}>
          LOGIN
        </button>
      </div>

      {/* 👇 Render the route-specific component here */}
      <Outlet />
    </>
  );
};

export default Layout;
