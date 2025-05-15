import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { getCurrentUser } from "../services/auth";

export default function Header({ onLogout }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const username = getCurrentUser();

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300
      ${darkMode 
        ? 'bg-gray-900/80 border-b border-blue-500/20' 
        : 'bg-white/80 border-b border-blue-200'}`}>
      
      {/* Decorative top gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 animate-gradient"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className={`p-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 
                transform group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl animate-float">🌍</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 
                  bg-clip-text text-transparent animate-gradient-x">
                  GlobeScope
                </h1>
                <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  Explore the World
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation and User Controls */}
          <div className="flex items-center space-x-4">
            {/* Favorites Link */}
            <Link to="/favorites" 
              className={`px-4 py-2 rounded-lg transition-all duration-200
                ${darkMode 
                  ? 'text-blue-200 hover:bg-blue-500/20' 
                  : 'text-blue-600 hover:bg-blue-50'}`}>
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Favorites</span>
              </span>
            </Link>

            {/* User Welcome */}
            <div className={`px-4 py-2 rounded-lg
              ${darkMode ? 'text-blue-200' : 'text-blue-600'}`}>
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Welcome, {username}</span>
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200
                ${darkMode 
                  ? 'text-blue-200 hover:bg-blue-500/20' 
                  : 'text-blue-600 hover:bg-blue-50'}`}>
              {darkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className={`px-4 py-2 rounded-lg transition-all duration-200
                ${darkMode 
                  ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' 
                  : 'bg-red-100 text-red-600 hover:bg-red-200'}`}>
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
