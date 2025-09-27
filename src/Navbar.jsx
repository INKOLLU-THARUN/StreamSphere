// src/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setSearchQuery }) => {
  const [input, setInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchQuery(input);
    navigate("/"); // Redirect to Home to show results
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="menu_bar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "#ae09e5" }} onClick={closeMenu}>
          Stream<span>Sphere</span>
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <nav className="nav-links">
        <ul className={isMenuOpen ? "show" : ""}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/movies" onClick={closeMenu}>Movies</Link></li>
          <li><Link to="/tvshows" onClick={closeMenu}>TV Shows</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>
      </nav>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Link to="/login" onClick={closeMenu}>
        <button className="login-btn">Login</button>
      </Link>
    </header>
  );
};

export default Navbar;