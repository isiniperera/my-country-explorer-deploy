import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search by country name..."
      value={query}
      onChange={handleChange}
      className="w-1/2 px-4 py-2 border border-gray-300 rounded-md text-black dark:text-black bg-white dark:bg-white placeholder-gray-500"
    />
  );
}
