import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuizResults.css";

const QuizResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("/api/auth/user/results", {
          headers: {
            "x-auth-token": token,
          },
        });
        setResults(response.data);
      } catch (error) {
        setError("Error fetching results");
        console.error(
          "Error fetching results:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchResults();
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

  return (
    <div className="results-container">
      <h1>Quiz Results</h1>
      {results.length > 0 ? (
        <div className="results-list">
          {results.map((result) => (
            <div key={result._id} className="result-card">
              <h2 className="quiz-title">{result.quizTitle}</h2>
              <p>
                <strong>Attempted Date:</strong>{" "}
                {new Date(result.attemptedDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Score:</strong> {result.score} / {result.total}
              </p>
              <p>
                <strong>Duration:</strong> {formatDuration(result.duration)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

// Helper function to format the duration
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export default QuizResults;
