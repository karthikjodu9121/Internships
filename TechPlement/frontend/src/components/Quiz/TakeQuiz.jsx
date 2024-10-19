import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./TakeQuiz.css";

const TakeQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (quizId) {
          const response = await axios.get(`/api/auth/quizzes/${quizId}`, {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          });
          setQuiz(response.data);
          setTimeLeft(response.data.quiz_time * 60);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmit();
    }
  }, [timeLeft, showResults]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setUserAnswers((prevUserAnswers) => {
      const newUserAnswers = { ...prevUserAnswers };
      if (newUserAnswers[questionIndex] === optionIndex) {
        delete newUserAnswers[questionIndex];
      } else {
        newUserAnswers[questionIndex] = optionIndex;
      }
      return newUserAnswers;
    });
  };

  const handleClearResponse = (questionIndex) => {
    setUserAnswers((prevUserAnswers) => {
      const newUserAnswers = { ...prevUserAnswers };
      delete newUserAnswers[questionIndex];
      return newUserAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (quiz) {
      let correctAnswers = 0;
      quiz.questions.forEach((question, index) => {
        if (
          userAnswers[index] !== undefined &&
          question.options[userAnswers[index]].isCorrect
        ) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setShowResults(true);

      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);

        const duration = quiz.quiz_time * 60 - timeLeft; // Calculate the duration
        const response = await axios.post(
          `/api/auth/results/${quizId}`,
          {
            score: correctAnswers,
            total: quiz.questions.length,
            duration: duration,
            quizTitle: quiz.title,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log("Response:", response);
      } catch (error) {
        console.error("Error submitting results:", error);
      }
    }
  }, [quiz, userAnswers, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="take-quiz-container">
      <div className="sidebar">
        <div className="color-legend">
          <div>
            <span className="legend-color reached"></span> Reached but not
            attempted
          </div>
          <div>
            <span className="legend-color attempted"></span> Attempted
          </div>
        </div>
        <ul className="question-list">
          {quiz.questions.map((_, index) => (
            <li key={index}>
              <button
                className={
                  userAnswers[index] !== undefined
                    ? "attempted"
                    : currentQuestionIndex === index
                    ? "current"
                    : index < currentQuestionIndex
                    ? "skipped"
                    : "unreached"
                }
                onClick={() => handleQuestionClick(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="quiz-content">
        {!showResults ? (
          <>
            <h1>Take Quiz: {quiz.title}</h1>
            <div className="timer">Time Left: {formatTime(timeLeft)}</div>
            <div className="question-container">
              <h2>
                Question {currentQuestionIndex + 1}:{" "}
                {quiz.questions[currentQuestionIndex].question}
              </h2>
            </div>
            <div className="options-container">
              {quiz.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <div key={index} className="option">
                    <input
                      type="radio"
                      id={`q${currentQuestionIndex}o${index}`}
                      name={`question${currentQuestionIndex}`}
                      value={index}
                      checked={userAnswers[currentQuestionIndex] === index}
                      onChange={() =>
                        handleAnswerChange(currentQuestionIndex, index)
                      }
                    />
                    <label htmlFor={`q${currentQuestionIndex}o${index}`}>
                      {option.text}
                    </label>
                  </div>
                )
              )}
            </div>
            <button
              onClick={() => handleClearResponse(currentQuestionIndex)}
              className="clear-response-button"
            >
              Clear Response
            </button>
            <div className="navigation-buttons">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === quiz.questions.length - 1}
              >
                Next
              </button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        ) : (
          <div className="results">
            <h2>Quiz Completed!</h2>
            <p>
              Your Score: {score} out of {quiz.questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
