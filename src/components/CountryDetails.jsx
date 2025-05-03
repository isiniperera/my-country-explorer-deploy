import { FiArrowLeft } from "react-icons/fi";

export default function CountryDetails({ country, onBack, codeToNameMap }) {
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
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-sm text-xl transition"
        title="Go Back"
      >
        <FiArrowLeft size={20} />
      </button>

      <div className="flex flex-col md:flex-row items-start gap-8">
        <img
          src={flags.svg}
          alt={name.common}
          className="w-full md:w-80 h-auto object-contain border rounded-lg shadow"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{name.common}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-gray-700">
            <p><span className="font-semibold text-gray-900">Official Name:</span> {name.official}</p>
            <p><span className="font-semibold text-gray-900">Capital:</span> {capital?.[0] || "N/A"}</p>
            <p><span className="font-semibold text-gray-900">Population:</span> {population.toLocaleString()}</p>
            <p><span className="font-semibold text-gray-900">Region:</span> {region}</p>
            <p><span className="font-semibold text-gray-900">Subregion:</span> {subregion}</p>
            <p>
              <span className="font-semibold text-gray-900">Languages:</span>{" "}
              {languages ? Object.values(languages).join(", ") : "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Currencies:</span>{" "}
              {currencies ? Object.values(currencies).map((c) => c.name).join(", ") : "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Timezones:</span>{" "}
              {timezones?.join(", ") || "N/A"}
            </p>
            <p className="col-span-1 sm:col-span-2">
              <span className="font-semibold text-gray-900">Borders:</span>{" "}
              {borderNames && borderNames.length > 0 ? borderNames.join(", ") : "None"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
