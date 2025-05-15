import { useState, useEffect, useRef, useCallback } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const inputRef = useRef(null);

  const handleClear = useCallback(() => {
    setSearchTerm("");
    setShowClear(false);
    onSearch("");
    inputRef.current?.focus();
  }, [onSearch]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Focus search on Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Clear search on Escape
      if (e.key === 'Escape' && searchTerm) {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [searchTerm, handleClear]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowClear(value.length > 0);
    setIsLoading(true);
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      onSearch(value);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Search input with new styling */}
        <div className="relative flex items-center">
          {/* Search icon */}
          <div className="absolute left-4 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 
              bg-white dark:bg-gray-800 
              border-gray-200 dark:border-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              hover:border-blue-400 dark:hover:border-blue-500
              transition-all duration-200
              shadow-sm"
            aria-label="Search countries"
          />

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute right-12 text-blue-500">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {/* Clear button */}
          {showClear && (
            <button
              onClick={handleClear}
              className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search tips */}
      <div className="mt-2 flex items-center justify-between text-sm text-blue-500/70">
        <span>Press Esc to clear</span>
        
      </div>
    </div>
  );
}
