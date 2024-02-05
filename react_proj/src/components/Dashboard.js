// Dashboard.js
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      localStorage.clear();
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card style = {{backgroundColor:"#727272"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          
          <strong>Email:</strong> {currentUser.email}
          
          <Link to="/forgot-password" className="btn btn-primary w-100 mt-3" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF', color: "black" }}>
            Update Profile
          </Link>

          <Link to="/wheather" className="btn btn-primary w-100 mt-3" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF' , color: "black" }}>
            Weather
          </Link>

          <Link to="/toDoList" className="btn btn-primary w-100 mt-3" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF' , color: "black" }}>
            ToDo List
          </Link>
        
        </Card.Body>
      </Card>
      
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
