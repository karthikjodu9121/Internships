import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditQuiz.css";

const EditQuiz = ({ quiz, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizTime, setQuizTime] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description);
      setQuizTime(quiz.quiz_time);
      setQuestions(quiz.questions);
    }
  }, [quiz]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = {
      ...newQuestions[questionIndex].options[optionIndex],
      [field]: value,
    };
    setQuestions(newQuestions);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `/api/auth/quizzes/${quiz._id}`,
        {
          title,
          description,
          quiz_time: quizTime,
          questions,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"), // Include token
          },
        }
      );
      onClose();
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  if (!quiz) {
    return null;
  }

  return (
    <div className="edit-quiz">
      <h2>Edit Quiz</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <label>
        Quiz Time (in minutes):
        <input
          type="number"
          value={quizTime}
          onChange={(e) => setQuizTime(e.target.value)}
        />
      </label>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="question-container">
          <label>
            Question {qIndex + 1}:
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
            />
          </label>
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="option-container">
              <label>
                Option {oIndex + 1}:
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, "text", e.target.value)
                  }
                />
              </label>
              <label>
                Correct:
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) =>
                    handleOptionChange(
                      qIndex,
                      oIndex,
                      "isCorrect",
                      e.target.checked
                    )
                  }
                />
              </label>
            </div>
          ))}
        </div>
      ))}
      <div className="edit-quiz-actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditQuiz;
