import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Music } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-purple-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold flex items-center">
          <Music className="h-6 w-6 mr-2" />
          MusicGenre AI
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-purple-200">
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-purple-200"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-white hover:text-purple-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white hover:text-purple-200">
                Signup
              </Link>
              <Link to="/login" className="text-white hover:text-purple-200">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
