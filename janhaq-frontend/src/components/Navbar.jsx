import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Laws", path: "/laws" },
    { name: "Schemes", path: "/schemes" },
    { name: "Problem Solver", path: "/problem-solver" },
    { name: "Departments", path: "/departments" },
  ];

  if (user) {
    navLinks.push({ name: "Dashboard", path: "/dashboard" });
  }

  const linkClasses = (path) =>
    `relative font-medium transition-all duration-300 pb-1
     ${
       location.pathname === path
         ? "text-blue-600 dark:text-blue-400 after:w-full"
         : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
     }
     after:content-[''] after:absolute after:left-0 after:bottom-0 
     after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-blue-400
     after:rounded-full after:w-0 after:transition-all after:duration-300 
     hover:after:w-full`;

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 
        bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl 
        shadow-lg rounded-2xl px-6 py-3 w-[92%] md:w-[80%] 
        border border-white/20 dark:border-gray-700/40 
        z-50 transition-all duration-300 
        hover:shadow-2xl hover:bg-white/50 dark:hover:bg-gray-900/50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
        >
          JanHaq
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={linkClasses(link.path)}>
              {link.name}
            </Link>
          ))}

          <div className="flex items-center space-x-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition text-sm"
              >
                Logout
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="absolute mt-3 left-1/2 transform -translate-x-1/2 
          bg-white/50 dark:bg-gray-900/60 backdrop-blur-2xl 
          rounded-2xl shadow-xl border border-white/20 
          dark:border-gray-700/40 w-[90%] md:hidden transition-all duration-300"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 text-center ${linkClasses(link.path)}`}
            >
              {link.name}
            </Link>
          ))}

          <div className="px-6 py-3 space-y-2 text-center">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
              >
                Logout
              </button>
            )}
          </div>

          <div className="px-6 py-3 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
