import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaHome, FaCompass, FaUpload, FaTrophy, FaUser } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext.jsx';
import memeLogo from "../assets/memelogo.png"

const NavBar = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: FaHome },
    { to: '/explore', label: 'Explore', icon: FaCompass },
    { to: '/upload', label: 'Upload', icon: FaUpload },
    { to: '/leaderboard', label: 'Leaderboard', icon: FaTrophy },
    { to: '/profile', label: 'Profile', icon: FaUser },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
      darkMode ? 'bg-gray-800/90' : 'bg-white/90'
    } shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.span 
              className={`text-xl font-bold flex items-center space-x-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={memeLogo} alt="MemeVerse Logo" className="h-8" />
              <span className="text-xl font-bold">MemeVerse</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <motion.div
                key={to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={to}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    isActive(to)
                      ? darkMode
                        ? 'bg-gray-700 text-white shadow-lg shadow-gray-700/50'
                        : 'bg-gray-100 text-gray-900 shadow-lg shadow-gray-200/50'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive(to) ? 'scale-110' : ''}`} />
                  <span className="text-sm lg:text-base">{label}</span>
                </Link>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
              }`}
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-gray-800/90' : 'bg-white/90'
            } border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col space-y-1">
                {navLinks.map(({ to, label, icon: Icon }) => (
                  <motion.div
                    key={to}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                        isActive(to)
                          ? darkMode
                            ? 'bg-gray-700 text-white shadow-lg shadow-gray-700/50'
                            : 'bg-gray-100 text-gray-900 shadow-lg shadow-gray-200/50'
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive(to) ? 'scale-110' : ''}`} />
                      <span>{label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
