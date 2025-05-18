import { useEffect, useState } from "react";
import { fetchAllCountries } from "../services/api";
import { FiX } from "react-icons/fi";

export default function FilterMenu({ onSelectRegion, onSelectLanguage, onClearFilters }) {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const loadLanguages = async () => {
      const all = await fetchAllCountries();
      const langSet = new Set();
      all.forEach((country) => {
        if (country.languages) {
          Object.values(country.languages).forEach((lang) => langSet.add(lang));
        }
      });
      setLanguages([...langSet].sort());
    };
    loadLanguages();
  }, []);

  return (
    <div className="flex flex-row gap-3 w-full">
      {/* Region Filter */}
      <div className="relative flex-1">
        <div className="relative">
          <div className="relative flex items-center">
            {/* Filter icon */}
            <div className="absolute left-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>

            <select
              className="w-full pl-12 pr-8 py-3.5 rounded-xl border-2 
                bg-white dark:bg-gray-800 
                border-gray-200 dark:border-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                hover:border-blue-400 dark:hover:border-blue-500
                transition-all duration-200
                shadow-sm
                appearance-none cursor-pointer"
              onChange={(e) => onSelectRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="absolute right-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Language Filter */}
      <div className="relative flex-1">
        <div className="relative">
          <div className="relative flex items-center">
            {/* Language icon */}
            <div className="absolute left-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>

            <select
              className="w-full pl-12 pr-8 py-3.5 rounded-xl border-2 
                bg-white dark:bg-gray-800 
                border-gray-200 dark:border-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                hover:border-blue-400 dark:hover:border-blue-500
                transition-all duration-200
                shadow-sm
                appearance-none cursor-pointer"
              onChange={(e) => onSelectLanguage && onSelectLanguage(e.target.value)}
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="absolute right-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters Button - Icon Only */}
      <button
        onClick={onClearFilters}
        className="flex items-center justify-center w-12 h-12 rounded-xl border-2
          bg-white dark:bg-gray-800 
          border-gray-200 dark:border-gray-700
          text-gray-900 dark:text-white
          hover:border-red-400 dark:hover:border-red-500
          hover:text-red-500 dark:hover:text-red-400
          transition-all duration-200
          shadow-sm"
        title="Clear all filters"
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>
  );
}