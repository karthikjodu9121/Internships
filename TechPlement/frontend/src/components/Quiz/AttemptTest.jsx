import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttemptTest.css";

const AttemptTest = () => {
  const [attempts, setAttempts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await axios.get("/api/auth/attempts", {
          headers: {
            "x-auth-token": token,
          },
        });
        setAttempts(response.data);
      } catch (error) {
        setError("Error fetching attempts");
        console.error(
          "Error fetching attempts:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAttempts();
    } else {
      setError("No authentication token found.");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Group attempts by quiz title
  const groupedAttempts = attempts.reduce((acc, attempt) => {
    if (!acc[attempt.quizTitle]) {
      acc[attempt.quizTitle] = [];
    }
    acc[attempt.quizTitle].push(attempt);
    return acc;
  }, {});

  return (
    <div className="attempts-container">
      <h1>Quiz Attempts</h1>
      {Object.keys(groupedAttempts).map((quizTitle) => (
        <div key={quizTitle} className="quiz-section">
          <h2>{quizTitle}</h2>
          <table className="attempts-table">
            <thead>
              <tr>
                <th>Creator ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Date</th>
                <th>Score</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {groupedAttempts[quizTitle].map((attempt) => (
                <tr key={attempt._id}>
                  <td>{attempt.creatorId}</td>
                  <td>{attempt.username}</td>
                  <td>{attempt.email}</td>
                  <td>{new Date(attempt.date).toLocaleDateString()}</td>
                  <td>
                    {attempt.score} / {attempt.total}
                  </td>
                  <td>{formatDuration(attempt.duration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

// Helper function to format the duration
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export default AttemptTest;
