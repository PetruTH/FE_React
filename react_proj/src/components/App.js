import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Wheather from "./Wheather";
import store from '../store';
import { Provider } from 'react-redux';
import Todo from "./TodoList";


function App() {
  return (
    <Container
        className="d-flex align-items-center justify-content-center dark-background"
        style={{ minHeight: "100vh", backgroundColor: "#282828", width: "100%" }}
    >
    <div className="w-100" style={{ maxWidth: "400px", width: "100%", backgroundColor: "#282828"}}>
        <Router>
          <Provider store={store}>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
                <Route path="/profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}></Route>
                <Route path="/wheather" element={<PrivateRoute><Wheather /></PrivateRoute>}></Route>
                <Route path="/toDoList" element={<PrivateRoute><Todo /></PrivateRoute>}></Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Provider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
