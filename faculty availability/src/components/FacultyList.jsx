import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "./FacultyList.css";  // ✅ Ensure CSS file is linked

const FacultyList = () => {
  const { department } = useParams(); // Get department from URL
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const q = query(collection(db, "teachers"), where("department", "==", department));
        const querySnapshot = await getDocs(q);
        
        const facultyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setFaculty(facultyData);
      } catch (error) {
        console.error("Error fetching faculty:", error);
      }
    };

    fetchFaculty();
  }, [department]);

  return (
    <div className="faculty-container">
      <h2>{department} Faculty List</h2>

      {faculty.length === 0 ? (
        <p className="no-faculty">No faculty available</p>
      ) : (
        <div className="faculty-list">
          {faculty.map(teacher => (
            <div key={teacher.id} className="faculty-card">
              <img src={teacher.img || "https://imgs.search.brave.com/24O946rt8uY1kmkVM56s5tl7We48WKXtUbQX9oLkTiQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL2NvbXAv/bWFkYW5hcGFsbGUv/cjgvOTk5OXA4NTcx/Ljg1NzEuMTgwNTI2/MTU0MDExLmgxcjgv/Y2F0YWxvZ3VlL21h/ZGFuYXBhbGxlLWlu/c3RpdHV0ZS1vZi10/ZWNobm9sb2d5LWFu/ZC1zY2llbmNlLWFu/Z2FsbHUtbWFkYW5h/cGFsbGUtY29sbGVn/ZXMtY3N0NTlyOWpq/eC5qcGc_dz0zODQw/JnE9NzU"} alt="Faculty" className="faculty-img" />
              <span className="faculty-name">{teacher.name || "Unknown"}</span>
              <span className={teacher.status === "Available" ? "status-available" : "status-not-available"}>
                {teacher.status}
              </span>
              {teacher.note && <p className="faculty-note">Note: {teacher.note}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyList;
