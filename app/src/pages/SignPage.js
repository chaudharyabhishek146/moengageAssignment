import React from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../contexts/AuthContext"

const SignPage = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { signup } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
    
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          return
        }
    
        setIsLoading(true)
    
        try {
          await signup(name, email, password)
          toast.success("Account created successfully!")
          navigate("/search")
        } catch (error) {
          setError(error.message || "Failed to create account")
          toast.error(error.message || "Failed to create account")
        } finally {
          setIsLoading(false)
        }
      }

  return (
    <div style={{display:"flex", justifyContent:"center" ,marginTop:'10%'}}>
      <div className="card  p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-muted">Enter your information to create an account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</div>}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input id="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignPage