import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EditQuiz from "../components/Quiz/EditQuiz";
import "./QuizCreator.css";
import heroImage from "../Create-a-Quiz.jpg";

const QuizCreator = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [username, setUsername] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("/api/auth/quizzes", {
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

  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setShowEditDialog(true);
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete quiz with id:", id);
    try {
      await axios.delete(`/api/auth/quizzes/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"), // Include token
        },
      });
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error(
        "Error deleting quiz:",
        error.response?.data || error.message
      );
    }
  };

  const handleShare = (quizId) => {
    const shareUrl = `${window.location.origin}/quiz/${quizId}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Quiz link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error sharing quiz:", error);
      });
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="quiz-creator-container">
      <header className="header">
        <div className="hero-image">
          <img src={heroImage} alt="Hero" />
        </div>
        <h1>Welcome</h1>
        <p>{username}!</p>
      </header>
      <nav className="options">
        <Link to="/create-quiz">
          <button className="nav-button">Create a Quiz</button>
        </Link>
        <Link to="/attempt-test">
          <button className="nav-button">Attempted Test</button>
        </Link>
      </nav>
      <div className="quizzes-container">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h2 className="quiz-title">{quiz.title}</h2>
            <p className="questions-count">
              Number of Questions: {quiz.questions.length}
            </p>
            <div className="quiz-actions">
              <button className="edit-button" onClick={() => handleEdit(quiz)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(quiz._id)}
              >
                Delete
              </button>
              <button
                className="share-button"
                onClick={() => handleShare(quiz._id)}
              >
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
      {showEditDialog && (
        <div className="edit-dialog">
          <div className="edit-dialog-content">
            <EditQuiz quiz={selectedQuiz} onClose={handleCloseEditDialog} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCreator;
