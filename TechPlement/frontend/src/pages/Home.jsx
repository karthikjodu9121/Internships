import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-section">
        <img src="/img/Quiz.png" alt="Home" className="home-image" />
      </div>
      <div className="content-section">
        <h1>Welcome to Our Application</h1>
        <p>
          Experience the best services with us. Get started on your journey now.
        </p>
        <Link to="/get-started">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
