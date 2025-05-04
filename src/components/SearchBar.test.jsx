// src/components/SearchBar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('calls onSearch when typing in the input', () => {
  // Mock function to track the search calls
  const mockSearch = jest.fn();
  
  // Render the SearchBar component with the mock function
  render(<SearchBar onSearch={mockSearch} />);
  
  // Get the input element by its placeholder text
  const input = screen.getByPlaceholderText(/search by country name.../i);
  
  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'Sri Lanka' } });
  
  // Check if the mockSearch function is called with the correct value
  expect(mockSearch).toHaveBeenCalledWith('Sri Lanka');
});

test('renders the input field correctly', () => {
  // Mock function to track the search calls
  const mockSearch = jest.fn();
  
  // Render the SearchBar component
  render(<SearchBar onSearch={mockSearch} />);
  
  // Check if the input field is present
  const input = screen.getByPlaceholderText(/search by country name.../i);
  
  // Ensure the input is in the document
  expect(input).toBeInTheDocument();
});
