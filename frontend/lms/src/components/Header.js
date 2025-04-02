import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "./AuthProvider";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <header className="header">
      <div className="header-top">
        <img src="/images/logo.jpg" alt="LMS Logo" className="logo" />
        <h1 className="title">LMS - Learning Management System</h1>
      </div>

      <nav className="nav">
          <ul>
              <li><Link to="/">Home</Link></li>
              {!isLoggedIn ? (
                  <>
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/signup">Signup</Link></li>
                  </>
              ) : (
                  <>
                      <li><Link to="/courses">Courses</Link></li>
                      <li><Link to="/" onClick={logout}>Logout</Link></li>
                  </>
              )}
          </ul>
      </nav>
    </header>
  );
};

export default Header;
