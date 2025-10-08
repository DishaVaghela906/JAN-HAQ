import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Laws', path: '/laws' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Departments', path: '/departments' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Solve Problem', path: '/problem-solver' },
  ];

  const linkClasses = (path) =>
    `font-medium transition ${
      location.pathname === path
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-gray-700 dark:text-gray-200 hover:text-blue-500'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          JanHaq
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={linkClasses(link.path)}>
              {link.name}
            </Link>
          ))}

          {/* Login/Register buttons */}
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Register
          </Link>

          {/* Dark/Light Mode Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 ${linkClasses(link.path)}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Login/Register buttons */}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-center bg-blue-600 text-white rounded-lg mb-2 hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register
          </Link>

          {/* Dark/Light Mode Toggle */}
          <div className="px-6 py-3 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
