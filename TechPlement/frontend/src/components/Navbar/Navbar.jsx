import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, logout, role }) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to={
            isLoggedIn
              ? role === "creator"
                ? "/quizcreator"
                : "/quiztaker"
              : "/"
          }
          className="navbar-logo"
        >
          QuizApp
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link
              to={
                isLoggedIn
                  ? role === "creator"
                    ? "/quizcreator"
                    : "/quiztaker"
                  : "/"
              }
              className="navbar-link"
            >
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
              </li>
              <li className="navbar-item">
                <button className="navbar-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
