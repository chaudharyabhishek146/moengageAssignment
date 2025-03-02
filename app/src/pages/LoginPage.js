import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        await login(email, password)
        toast.success("Login successful!")
        navigate("/search")
      } catch (error) {
        toast.error(error.message || "Login failed")
        console.error("Login error:", error)
      } finally {
        setIsLoading(false)
      }
    }


  return (
    <div style={{display:"flex", justifyContent:"center" ,marginTop:'10%'}}>
    <div className="card p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Login</h2>
        <p className="text-muted">Enter your credentials to access your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
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
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="form-label mb-0">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-primary">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default LoginPage