import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Faculty Availability System</h1>
      <p>Choose your role to continue</p>
      <div className="buttons">
        <button className="teacher-btn" onClick={() => navigate("/teacher-login")}>
          Teacher Login
        </button>
        <button className="student-btn" onClick={() => navigate("/student-page")}>
          Student Page
        </button>
      </div>
    </div>
  );
};

export default Home;
