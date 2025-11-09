import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ user, isAuthenticated, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide buttons on login/register pages
  const hideButtons =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <nav className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg sm:text-2xl font-bold tracking-wide hover:text-blue-200 transition-colors"
          >
            Task<span className="text-yellow-300">Manager</span>
          </Link>

          {/* Desktop Links */}
          {!hideButtons && (
            <div className="hidden sm:flex items-center space-x-3 md:space-x-6">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-xs sm:text-sm md:text-base font-medium hover:text-yellow-300 transition-colors px-2 py-1 rounded"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-xs sm:text-sm md:text-base font-medium hover:text-yellow-300 transition-colors px-2 py-1 rounded"
                  >
                    {user?.name || "Profile"}
                  </button>
                  <button
                    onClick={onLogout}
                    className="text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 py-1 sm:py-2 bg-yellow-400 text-gray-900 rounded-lg shadow hover:bg-yellow-300 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xs sm:text-sm md:text-base font-medium hover:text-yellow-300 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs sm:text-sm md:text-base font-medium hover:text-yellow-300 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {!hideButtons && (
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none p-2"
              >
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!hideButtons && menuOpen && (
        <div className="sm:hidden bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-3 space-y-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block text-white text-base font-medium hover:text-yellow-300 transition-colors px-3 py-2 rounded-md bg-blue-700/20"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                className="block w-full text-left text-white text-base font-medium px-3 py-2 rounded-md hover:text-yellow-300 transition-colors bg-blue-700/20"
              >
                {user?.name || "Profile"}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left text-white text-base font-medium px-3 py-2 rounded-md bg-yellow-400 shadow hover:bg-yellow-300 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-white text-base font-medium hover:text-yellow-300 transition-colors px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-white text-base font-medium hover:text-yellow-300 transition-colors px-3 py-2 rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
