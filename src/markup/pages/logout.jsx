import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="btn btn-primary btn-lg mt-3 w-100"
      style={{ borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
