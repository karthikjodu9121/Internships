import React, { useState } from "react";
import Modal from "../components/PopupModel/Model";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "creator", // Default role
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        console.log("Registration successful:", result);
        // Reset form fields
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "creator",
        });
      } else {
        setError(result.msg || "Registration failed");
        console.error("Registration error:", result);
      }
    } catch (err) {
      setError("Server error, please try again later");
      console.error("Server error:", err);
    }
  };

  return (
    <div className="registration-container">
      <div className="image-section">
        <img
          src={`${process.env.PUBLIC_URL}/img/register.jpg`}
          alt="Registration"
          className="registration-image"
        />
      </div>
      <div className="form-section">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="creator">Creator</option>
              <option value="taker">Taker</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
      {/* Success Modal */}
      <Modal
        show={success}
        handleClose={handleCloseModal}
        title="Success"
        message="Registration successful!"
      />
      {/* Error Modal */}
      <Modal
        show={error !== null}
        handleClose={handleCloseModal}
        title="Error"
        message={error}
      />
    </div>
  );
};

export default RegistrationForm;
