import React, { useState } from "react";
import "./CreateQuiz.css"; // Import the CSS file
import Modal from "../PopupModel/Model"; // Import your existing modal component

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizTime, setQuizTime] = useState(""); // State for quiz time
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      correctOption: "",
    },
  ]);
  const [showModal, setShowModal] = useState(false); // State for modal

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuizTimeChange = (e) => {
    setQuizTime(e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.forEach((option, idx) => {
      option.isCorrect = idx === oIndex;
    });
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        correctOption: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      title: quizTitle,
      description, // Add description to the quiz data
      quiz_time: quizTime, // Add quiz time to the quiz data
      questions,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Quiz saved:", data);

      // Clear the form
      setQuizTitle("");
      setDescription("");
      setQuizTime("");
      setQuestions([
        {
          question: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          correctOption: "",
        },
      ]);

      // Show the success modal
      setShowModal(true);
    } catch (error) {
      console.error("There was an error saving the quiz!", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz Title:</label>
          <input
            type="text"
            value={quizTitle}
            onChange={handleQuizTitleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Quiz Time (in minutes):</label>
          <input
            type="number"
            value={quizTime}
            onChange={handleQuizTimeChange}
            required
          />
        </div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-block">
            <label>Question {qIndex + 1}:</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              required
            />
            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="option-block">
                <label>Option {oIndex + 1}:</label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  required
                />
                <input
                  type="radio"
                  name={`correctOption${qIndex}`}
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                />{" "}
                Correct
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Another Question
        </button>
        <button type="submit">Create Quiz</button>
      </form>

      <Modal
        show={showModal}
        handleClose={closeModal}
        title="Success"
        message="Quiz created successfully!"
      />
    </div>
  );
};

export default CreateQuiz;
