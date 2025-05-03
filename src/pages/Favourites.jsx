import { getCurrentUser } from "../services/auth";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { ThemeContext } from "../Context/ThemeContext";

export default function Favorites() {
  const username = getCurrentUser();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const allFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    setFavorites(allFavorites[username] || []);
  }, [username]);

  const removeFromFavorites = (cca3) => {
    const allFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    const updatedFavorites = (allFavorites[username] || []).filter(
      (country) => country.cca3 !== cca3
    );
    const removedCountry = (allFavorites[username] || []).find(
      (country) => country.cca3 === cca3
    );

    allFavorites[username] = updatedFavorites;
    localStorage.setItem("favorites", JSON.stringify(allFavorites));
    setFavorites(updatedFavorites);

    toast.success(`${removedCountry?.name?.common || "Country"} removed from favorites`);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen max-w-[full] w-full mx-auto  shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow text-xl transition"
          title="Go Back"
        >
          <FiArrowLeft size={20} />
        </button>
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Favorite Countries</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-lg">You haven't added any favorites yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((country) => (
            <li
              key={country.cca3}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition relative"
            >
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-32 object-cover rounded-md mb-3 border"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{country.name.common}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{country.region}</p>
              <button
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow transition"
                onClick={() => removeFromFavorites(country.cca3)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
