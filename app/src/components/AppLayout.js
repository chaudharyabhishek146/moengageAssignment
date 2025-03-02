import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { NavBar } from "./NavBar"

const AppLayout = ({ children }) => {


  return (
    <div className="">
      <NavBar />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} HTTP Dog Explorer. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Images courtesy of{" "}
            <a href="https://http.dog/" target="_blank" rel="noopener noreferrer" className="underline">
              http.dog
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default AppLayout

