import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from '../Context/ThemeContext';
import Home from './Home';
import { fetchAllCountries } from '../services/api';
import { getCurrentUser } from '../services/auth';

// Mock the API services
jest.mock('../services/api', () => ({
  fetchAllCountries: jest.fn(),
  fetchCountryByName: jest.fn(),
}));

// Mock the auth service
jest.mock('../services/auth', () => ({
  getCurrentUser: jest.fn(),
  logout: jest.fn(),
}));

describe('Home Component', () => {
  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      region: 'Americas',
      capital: ['Washington D.C.'],
      population: 331002651,
      flags: { svg: 'https://flagcdn.com/us.svg' },
      languages: { eng: 'English' },
    }
  ];

  const mockThemeContext = {
    darkMode: false,
    toggleTheme: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getCurrentUser.mockReturnValue('testuser');
    fetchAllCountries.mockResolvedValue(mockCountries);
  });

  const renderHome = () => {
    return render(
      <BrowserRouter>
        <ThemeContext.Provider value={mockThemeContext}>
          <Home />
        </ThemeContext.Provider>
      </BrowserRouter>
    );
  };

  it('should render login form when user is not logged in', () => {
    getCurrentUser.mockReturnValue(null);
    renderHome();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  });

  it('should render country cards when user is logged in', async () => {
    await act(async () => {
      renderHome();
    });

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
  });
}); 