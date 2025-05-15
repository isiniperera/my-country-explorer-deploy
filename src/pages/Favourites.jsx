import { getCurrentUser } from "../services/auth";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { ThemeContext } from "../Context/ThemeContext";
import Header from "../components/Header";

export default function Favorites() {
  const username = getCurrentUser();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const { darkMode } = useContext(ThemeContext);

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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header onLogout={() => navigate('/')} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow text-xl transition"
              title="Go Back"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Your Favorite Countries
            </h1>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            {favorites.length} {favorites.length === 1 ? 'country' : 'countries'} saved
          </div>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="max-w-md mx-auto px-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                No Favorites Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start exploring countries and add them to your favorites!
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
              >
                Explore Countries
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((country) => (
              <div
                key={country.cca3}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                {/* Country Flag */}
                <div className="relative h-40">
                  <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Country Info */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {country.name.common}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-medium">Region:</span> {country.region}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Population:</span> {country.population.toLocaleString()}
                  </p>
                </div>

                {/* Remove Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => removeFromFavorites(country.cca3)}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}