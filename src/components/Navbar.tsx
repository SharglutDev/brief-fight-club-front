import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <h1 className="logo">Fight Club</h1>
        <ul className="nav-links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/create">Add Hero</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
