import { useEffect, useState } from "react";
import { fetchAllCountries } from "../services/api";

export default function FilterMenu({ onSelectRegion, onSelectLanguage }) {
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
    <div className="flex gap-4 my-4">
      <select
        className="px-4 py-2 border border-gray-300 rounded-md text-black dark:text-black bg-white dark:bg-white"
        onChange={(e) => onSelectRegion(e.target.value)}
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        className="px-4 py-2 border border-gray-300 rounded-md text-black dark:text-black bg-white dark:bg-white"
        onChange={(e) => onSelectLanguage && onSelectLanguage(e.target.value)}
      >
        <option value="">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
