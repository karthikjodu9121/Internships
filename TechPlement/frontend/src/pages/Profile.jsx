import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./Profile.css";
import profileImg from "../profile.jpg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/auth/user", {
          headers: {
            "x-auth-token": localStorage.getItem("token"), // Include token
          },
        });
        setUser(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data"); // Set error message if there is an issue
        setLoading(false); // Ensure loading is set to false even if there is an error
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, []); // Empty dependency array ensures this runs only once

  const handleUpdateProfile = () => {
    // Add logic for updating profile
  };

  const handleResetPassword = () => {
    // Add logic for resetting password
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="profile">
      <h2>User Profile</h2>
      {user ? (
        <div className="profile-content">
          <div className="profile-image">
            <img src={profileImg} alt="Profile" />
          </div>
          <div className="profile-details">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Profile Created:</strong>{" "}
              {user.createdAt
                ? moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")
                : "Date not available"}
            </p>
          </div>
          <div className="profile-actions">
            <button onClick={handleUpdateProfile}>Update Profile</button>
            <button onClick={handleResetPassword}>Reset Password</button>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
