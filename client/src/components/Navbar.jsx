// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/Navbar.css";

const Navbar = (props) => {
  const links = [
    { path: "/home", text: "Home" },
    { path: "/findride", text: "Find Ride" },
    { path: "/postride", text: "Post Rides" },
    { path: "#about-us", text: "About Us" },
  ];

  return (
    <div data-testid="navbar-testid" className="container d-flex justify-content-between align-items-center py-3 navbar-bg">
      <div>LOGO</div>
      <nav className="d-flex">
        {links.map((link, index) => (
          <Link
            key={index}
            className={`nav-link me-3 ${props.textColor}`}
            to={link.path}
          >
            {link.text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
