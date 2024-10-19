import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./QuizTaker.css";
import heroImage from "../cover.png";

const QuizTaker = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("/api/auth/all-quizzes", {
          headers: {
            "x-auth-token": localStorage.getItem("token"), // Include token
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    const fetchUsername = async () => {
      try {
        const response = await axios.get("/api/auth/user", {
          headers: {
            "x-auth-token": localStorage.getItem("token"), // Include token
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchQuizzes();
    fetchUsername();
  }, []);

  return (
    <div className="quiz-taker-container">
      <header className="header">
        <div className="hero-image">
          <img src={heroImage} alt="Hero" />
        </div>
        <h1>Welcome</h1>
        <p>{username}!</p>
      </header>

      <nav className="options">
        <Link to="/user-results">
          <button className="nav-button">Saved Quizzes</button>
        </Link>
        <Link to="/quiz-history">
          <button className="nav-button">Quiz History</button>
        </Link>
      </nav>

      <div className="quizzes-container">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h2 className="quiz-title">{quiz.title}</h2>
            <p className="quiz-category">Description: {quiz.description}</p>
            <p className="questions-count">
              Number of Questions: {quiz.questions.length}
            </p>
            <Link to={`/take-quiz/${quiz._id}`}>
              <button className="take-quiz-button">Take Test</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizTaker;
