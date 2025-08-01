import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [status, setStatus] = useState("Not Available");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const teacherEmail = auth.currentUser?.email;
  const teacherDocRef = teacherEmail ? doc(db, "teachers", teacherEmail) : null;

  useEffect(() => {
    if (!teacherDocRef) return;
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(teacherDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStatus(data.status || "Not Available");
          setNote(data.note || "");
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchData();
  }, [teacherDocRef]);

  const updateStatus = async (newStatus) => {
    setStatus(newStatus);
    if (teacherDocRef) {
      await setDoc(teacherDocRef, { status: newStatus, note }, { merge: true });
    }
  };

  const updateNote = async (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    if (teacherDocRef) {
      await setDoc(teacherDocRef, { status, note: newNote }, { merge: true });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h2>Teacher Dashboard</h2>

      <p className="status-section"><strong>Status:</strong> {status}</p>
      <div className="button-group">
        <button className="status-btn available" onClick={() => updateStatus("Available")}>
          Mark as Available
        </button>
        <button className="status-btn not-available" onClick={() => updateStatus("Not Available")}>
          Mark as Not Available
        </button>
      </div>

      <h3>Leave a Note</h3>
      <input 
        type="text" 
        className="note-input"
        value={note} 
        onChange={updateNote} 
        placeholder="Enter a note..." 
      />

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
