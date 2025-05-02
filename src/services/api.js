const BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  return res.json();
};

export const fetchCountryByName = async (name) => {
  const res = await fetch(`${BASE_URL}/name/${name}`);
  return res.json();
};

export const fetchCountriesByRegion = async (region) => {
  const res = await fetch(`${BASE_URL}/region/${region}`);
  return res.json();
};

export const fetchCountryByCode = async (code) => {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  return res.json();
};
