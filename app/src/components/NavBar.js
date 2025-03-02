import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const NavBar = () => {
    const location = useLocation()
  const navigate = useNavigate()
  const {user,logout}=useAuth();
  const handleLogout = () => {
      logout()
      navigate("/")
    }
  
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
   <Link to="/search"> <a class="navbar-brand d-flex align-items-center" >
        <span class="fw-bold">HTTP Dog Codes</span>
    </a>
    </Link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-between" id="navbarContent">

        <div class="d-flex align-items-center ms-auto">
        <Link
              to="/search"
              className={`text-sm font-medium me-3 ${
                location.pathname === "/search" ? "text-primary" : "text-muted hover:text-primary"
              }`}
            >
              Search
            </Link>
            <Link
              to="/lists"
              className={`text-sm font-medium me-3 ${
                location.pathname === "/lists" ? "text-primary" : "text-muted hover:text-primary"
              }`}
            >
              My Lists
            </Link>
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
                    {user?.name.split(" ")[0]}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item text-danger" onClick={handleLogout} href="/login">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</nav>
  )
}
