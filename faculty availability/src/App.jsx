import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; 
import StudentPage from "./components/StudentPage";
import FacultyList from "./components/FacultyList";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";

// 🆕 Import admin components

import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher-login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-page" element={<StudentPage />} />
        <Route path="/faculty/:department" element={<FacultyList />} />
        


        {/* 🆕 Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
