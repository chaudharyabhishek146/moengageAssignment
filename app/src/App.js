import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

// Context Providers
import { AuthProvider } from "./contexts/AuthContext"
import { ListsProvider } from "./contexts/ListContext"

// Pages
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage"
import SignPage from "./pages/SignPage"
import ListsPage from "./pages/ListsPage"
import { NavBar } from "./components/NavBar"

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token")
    if (!token) {
      return <Navigate to="/login" replace />
    }
    return children
  }

function App() {
  return (
    <AuthProvider>
      <ListsProvider>
        <Router>
          <Routes>
          
          <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignPage />} />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lists"
              element={
                <ProtectedRoute>
                  <ListsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
     
      </ListsProvider>
    </AuthProvider>
  )
}

export default App

