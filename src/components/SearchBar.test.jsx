// src/components/SearchBar.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';

test('calls onSearch when typing in the input', async () => {
  // Mock function to track the search calls
  const mockSearch = jest.fn();
  
  // Render the SearchBar component with the mock function
  render(<SearchBar onSearch={mockSearch} />);
  
  // Get the input element by its aria-label
  const input = screen.getByLabelText(/search countries/i);
  
  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'Sri Lanka' } });
  
  // Wait for the debounce to complete and verify the mock was called
  await waitFor(() => {
    expect(mockSearch).toHaveBeenCalledWith('Sri Lanka');
  });
});

test('renders the input field correctly', () => {
  // Mock function to track the search calls
  const mockSearch = jest.fn();
  
  // Render the SearchBar component
  render(<SearchBar onSearch={mockSearch} />);
  
  // Check if the input field is present using aria-label
  const input = screen.getByLabelText(/search countries/i);
  
  // Ensure the input is in the document
  expect(input).toBeInTheDocument();
});
