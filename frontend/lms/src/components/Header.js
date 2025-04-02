import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <img src="/images/logo.jpg" alt="LMS Logo" className="logo" />
        <h1 className="title">LMS - Learning Management System</h1>
      </div>

      <nav className="nav">
        <ul>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
