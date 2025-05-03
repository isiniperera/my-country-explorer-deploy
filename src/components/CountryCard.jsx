// src/components/CountryCard.jsx
import { FaHeart } from "react-icons/fa";

export default function CountryCard({ country, onClick, onFavorite }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out relative"
      onClick={() => onClick(country)}
    >
      {/* Country Flag */}
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-40 object-cover border-b"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {country.name.common}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">Capital:</span>{" "}
          {country.capital?.[0] || "N/A"}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">Region:</span>{" "}
          {country.region}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">Languages:</span>{" "}
          {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
        </p>
      </div>

      {/* Favorite Button */}
      <button
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-lg p-2 rounded-full shadow-lg transition transform hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          onFavorite?.(country);
        }}
        title="Add to Favorites"
      >
        <FaHeart />
      </button>
    </div>
  );
}
