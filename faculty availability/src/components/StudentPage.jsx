import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentPage.css";  // ✅ Ensure CSS is linked properly

const StudentPage = () => {
  const [departments] = useState(["CSE", "ECE", "EEE", "ME", "CIV"]);
  const navigate = useNavigate();

  return (
    <div className="student-container">
      <h2>Select Your Department</h2>
      <ul className="department-list">
        {departments.map((dept) => (
          <li key={dept}>
            <button className="dept-btn" onClick={() => navigate(`/faculty/${dept}`)}>
              {dept}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentPage;
