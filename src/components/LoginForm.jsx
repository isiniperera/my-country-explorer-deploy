import { useState } from "react";
import { login } from "../services/auth";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Map background with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] 
          bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-indigo-900/60"></div>
      </div>
      
      <div className="max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 
        bg-white border border-gray-200">
        
        {/* Decorative top border with animation */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-t-xl animate-gradient"></div>
        
        <div className="text-center mb-8">
          {/* Animated globe icon */}
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mb-4
            transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
            <span className="text-5xl animate-float">🌍</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 
            bg-clip-text text-transparent animate-gradient-x">
            GlobeScope
          </h1>
          
          <p className="text-gray-600 text-lg font-medium">
            Explore the world with ease
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label htmlFor="username" 
              className="block text-sm font-medium mb-2 text-gray-700 
                group-hover:text-gray-900 transition-colors duration-200">
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200
                  bg-white border-gray-200 
                  text-gray-900 placeholder-gray-400
                  hover:border-blue-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="absolute inset-0 rounded-lg pointer-events-none ring-1 ring-inset ring-gray-200"></div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-4 rounded-lg font-medium
              hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40
              relative overflow-hidden group"
          >
            <span className="relative z-10">Start Exploring</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            No password required - just enter a username to begin your adventure
          </p>
        </div>

        {/* Decorative bottom border with animation */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-b-xl animate-gradient"></div>
      </div>
    </div>
  );
}
