import { useState, useEffect, useContext } from "react";
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchCountriesByRegion,
} from "../services/api";
import { getCurrentUser, logout } from "../services/auth";
import SearchBar from "../components/SearchBar";
import FilterMenu from "../components/FilterMenu";
import CountryCard from "../components/CountryCard";
import CountryDetails from "../components/CountryDetails";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ThemeContext } from "../Context/ThemeContext";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [codeToNameMap, setCodeToNameMap] = useState({});
  const [username, setUsername] = useState(getCurrentUser());
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchAllCountries().then((data) => {
      setCountries(data);
      setAllCountries(data);
      const map = {};
      data.forEach((country) => {
        map[country.cca3] = country.name.common;
      });
      setCodeToNameMap(map);
    });
  }, []);

  const applyFilters = (region, language) => {
    let filtered = [...allCountries];

    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    if (language) {
      filtered = filtered.filter(
        (country) =>
          country.languages &&
          Object.values(country.languages).includes(language)
      );
    }

    setCountries(filtered);
  };

  const handleSearch = async (name) => {
    if (!name) return setCountries(allCountries);
    try {
      const result = await fetchCountryByName(name);
      setCountries(result);
    } catch {
      setCountries([]);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    applyFilters(region, selectedLanguage);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    applyFilters(selectedRegion, language);
  };

  const handleFavorite = (country) => {
    if (!username) {
      toast.error("Please log in to favorite countries.");
      return;
    }

    const allFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    const userFavorites = allFavorites[username] || [];

    const exists = userFavorites.find((c) => c.cca3 === country.cca3);
    if (exists) {
      toast.error(`${country.name.common} is already in your favorites`);
      return;
    }

    const updated = {
      ...allFavorites,
      [username]: [...userFavorites, country],
    };
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.success(`${country.name.common} added to favorites`);
  };

  const handleLogout = () => {
    logout();
    setUsername(null);
  };

  if (!username) {
    return <LoginForm onLogin={setUsername} />;
  }

  return (
    <div
      className={`p-6 min-h-screen max-w-[full] w-full mx-auto rounded-xl shadow-md
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          REST Countries Explorer
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/favorites">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              My Favorites
            </button>
          </Link>
          <span className="text-gray-700 dark:text-gray-300 font-semibold">
            Welcome, {username}!
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-all duration-300"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <SearchBar onSearch={handleSearch} />
        <FilterMenu
          onSelectRegion={handleRegionSelect}
          onSelectLanguage={handleLanguageSelect}
        />
      </div>

      {selectedCountry ? (
        <CountryDetails
          country={selectedCountry}
          onBack={() => setSelectedCountry(null)}
          codeToNameMap={codeToNameMap}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {countries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onClick={setSelectedCountry}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
