import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card style = {{backgroundColor:"#727272"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="text-center mb-1" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            
            <Form.Group className="text-center mb-1" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button 
              disabled={loading} 
              className="btn btn-primary w-100 mt-2 mb-2" type="submit" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF', color: "black" }}
            >
              Log In
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" className="btn btn-primary w-100 mt-2 mb-2" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF', color: "black" }}>
              Forgot Password?
            </Link>
          </div>

          <div className="w-100 text-center mt-2">
            Need an account? 
            <Link to="/signup" className="btn btn-primary w-100 mt-2 mb-2" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF', color: "black" }}>
              Sign Up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}