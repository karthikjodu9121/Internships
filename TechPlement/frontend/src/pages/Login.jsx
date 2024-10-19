import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../components/PopupModel/Model";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // 'taker' or 'creator'
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleCloseModal = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);

        const payload = JSON.parse(atob(result.token.split(".")[1]));
        const userRole = payload.user.role;

        setIsLoggedIn(userRole);

        if (userRole === "taker") {
          history.push("/quiztaker");
        } else if (userRole === "creator") {
          history.push("/quizcreator");
        } else {
          setError("Invalid role");
        }
      } else {
        setError(result.msg || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error, please try again later");
    }
  };

  return (
    <div className="parent-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="creator">Creator</option>
              <option value="taker">Taker</option>
            </select>
          </div>
          <button type="submit">Login</button>
        </form>
        <Modal
          show={error !== null}
          handleClose={handleCloseModal}
          title="Error"
          message={error}
        />
      </div>
    </div>
  );
};

export default Login;
