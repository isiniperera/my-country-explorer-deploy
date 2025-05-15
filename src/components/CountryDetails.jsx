import { FiArrowLeft } from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

export default function CountryDetails({ country, onBack, codeToNameMap }) {
  const { darkMode } = useContext(ThemeContext);
  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    timezones,
    borders,
  } = country;

  const borderNames = borders?.map((code) => codeToNameMap[code] || code);

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Back Button Section */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center 
            bg-gradient-to-r from-blue-500 to-blue-600 
            hover:from-blue-600 hover:to-blue-700 
            text-white rounded-full shadow-lg 
            transform hover:scale-110 transition-all duration-300"
          title="Go back"
        >
          <FiArrowLeft size={20} />
        </button>
      </div>

      {/* Main Content Card */}
      <div className={`p-8 rounded-2xl shadow-xl transform transition-all duration-300
        ${darkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'}`}>
        
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Flag Section with Hover Effect */}
          <div className="w-full md:w-96 transform transition-all duration-300 hover:scale-105">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={flags.svg}
                alt={name.common}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-8">
            {/* Title Section */}
            <div className="space-y-2">
              <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {name.common}
              </h2>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {name.official}
              </p>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div className="space-y-4">
                <InfoItem 
                  label="Capital" 
                  value={capital?.[0] || "N/A"} 
                  darkMode={darkMode} 
                />
                <InfoItem 
                  label="Region" 
                  value={region} 
                  darkMode={darkMode} 
                />
                <InfoItem 
                  label="Subregion" 
                  value={subregion} 
                  darkMode={darkMode} 
                />
                <InfoItem 
                  label="Population" 
                  value={population.toLocaleString()} 
                  darkMode={darkMode} 
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <InfoItem 
                  label="Languages" 
                  value={languages ? Object.values(languages).join(", ") : "N/A"} 
                  darkMode={darkMode} 
                />
                <InfoItem 
                  label="Currencies" 
                  value={currencies ? Object.values(currencies).map((c) => c.name).join(", ") : "N/A"} 
                  darkMode={darkMode} 
                />
                <InfoItem 
                  label="Timezones" 
                  value={timezones?.join(", ") || "N/A"} 
                  darkMode={darkMode} 
                />
              </div>
            </div>

            {/* Borders Section */}
            {borderNames && borderNames.length > 0 && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Border Countries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {borderNames.map((borderName) => (
                    <span
                      key={borderName}
                      className={`px-4 py-2 rounded-lg text-sm font-medium
                        ${darkMode 
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                        transition-colors duration-200`}
                    >
                      {borderName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for consistent info item styling
function InfoItem({ label, value, darkMode }) {
  return (
    <div className="group">
      <dt className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </dt>
      <dd className={`mt-1 text-lg ${darkMode ? 'text-white' : 'text-gray-900'} 
        group-hover:text-blue-500 transition-colors duration-200`}>
        {value}
      </dd>
    </div>
  );
}
