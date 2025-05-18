import { useState, useEffect, useContext } from "react";
import {
  fetchAllCountries,
  fetchCountryByName,
} from "../services/api";
import { getCurrentUser, logout } from "../services/auth";
import SearchBar from "../components/SearchBar";
import FilterMenu from "../components/FilterMenu";
import CountryCard from "../components/CountryCard";
import CountryDetails from "../components/CountryDetails";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import { ThemeContext } from "../Context/ThemeContext";
import toast from "react-hot-toast";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [codeToNameMap, setCodeToNameMap] = useState({});
  const [username, setUsername] = useState(getCurrentUser());
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { darkMode } = useContext(ThemeContext);

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

  const handleClearFilters = () => {
    setSelectedRegion("");
    setSelectedLanguage("");
    setCountries(allCountries);
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Only show search and filters when no country is selected */}
        {!selectedCountry && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search Bar - Increased width further */}
            <div className="w-full sm:w-1/2">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {/* Filter Menu - Adjusted width */}
            <div className="w-full sm:w-1/2">
              <FilterMenu
                onSelectRegion={handleRegionSelect}
                onSelectLanguage={handleLanguageSelect}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        )}

        {/* Results Section */}
        {selectedCountry ? (
          <CountryDetails
            country={selectedCountry}
            onBack={() => setSelectedCountry(null)}
            codeToNameMap={codeToNameMap}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </main>
    </div>
  );
}
