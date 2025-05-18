import { render, screen } from '@testing-library/react';
import { ThemeContext } from './Context/ThemeContext';
import App from './App';

// Mock the auth service
jest.mock('./services/auth', () => ({
  getCurrentUser: jest.fn(),
}));

describe('App Component', () => {
  const mockThemeContext = {
    darkMode: false,
    toggleTheme: jest.fn(),
  };

  const renderApp = () => {
    return render(
      <ThemeContext.Provider value={mockThemeContext}>
        <App />
      </ThemeContext.Provider>
    );
  };

  it('should render without crashing', () => {
    renderApp();
    // Test for elements that actually exist in the component
    expect(screen.getByText('GlobeScope')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start Exploring' })).toBeInTheDocument();
  });
}); 