// src/components/CountryCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from './CountryCard';

const mockCountry = {
  cca3: "LKA",
  name: { common: "Sri Lanka" },
  region: "Asia",
  capital: ["Sri Jayawardenepura Kotte"],
  population: 22000000,
  flags: { svg: "https://flagcdn.com/w320/lk.png" },
  languages: { sin: "Sinhala", tam: "Tamil" },
};

test('renders country card with correct details', () => {
  render(<CountryCard country={mockCountry} onClick={() => {}} onFavorite={() => {}} />);

  expect(screen.getByText("Sri Lanka")).toBeInTheDocument();
  expect(screen.getByText(/Asia/i)).toBeInTheDocument();
  expect(screen.getByText(/Sri Jayawardenepura Kotte/i)).toBeInTheDocument();
  expect(screen.getByText(/22,000,000/)).toBeInTheDocument();
  expect(screen.getByText(/Sinhala, Tamil/)).toBeInTheDocument();

  // Use alt text to get the image
  const image = screen.getByAltText("Sri Lanka");
  expect(image).toHaveAttribute('src', mockCountry.flags.svg);
});
