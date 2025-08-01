import React, { useEffect, useState } from "react";
import { auth, db, functions } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import Papa from "papaparse";
import "./AdminDashboard.css"; // Make sure this is the correct relative path

import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [facultyData, setFacultyData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser?.email !== "admin@example.com") {
      alert("Access Denied");
      navigate("/login");
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/Home");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setFacultyData(results.data);
        },
      });
    }
  };

  const uploadCSVData = async () => {
    const createUser = httpsCallable(functions, "createUser");

    try {
      for (let faculty of facultyData) {
        if (!faculty.email || !faculty.password) continue;

        // Check if user already exists in Firestore
        const docRef = doc(db, "teachers", faculty.email);
        const existing = await getDoc(docRef);
        if (existing.exists()) continue;

        // Create Firebase Auth user
        await createUser({
          email: faculty.email,
          password: faculty.password,
        });

        // Store in Firestore
        await setDoc(docRef, {
          name: faculty.name,
          email: faculty.email,
          mobile: faculty.mobile,
          profilePic: faculty.profilePic,
          cabin: faculty.cabin,
          status: faculty.status || "Not Available",
          note: faculty.note || "",
        });
      }

      alert("CSV data uploaded successfully!");
    } catch (err) {
      console.error(err);
      setError("Error uploading data: " + err.message);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <div className="upload-section">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button onClick={uploadCSVData}>Upload Faculty CSV</button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminDashboard;
