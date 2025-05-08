import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlayersList from '../PlayersList';
import { api } from '../../api/service';

// Mock API service
jest.mock('../../api/service', () => ({
  api: {
    getPlayersList: jest.fn()
  }
}));

describe('PlayersList Component', () => {
  // Keep track of original console methods
  const originalConsoleError = console.error;
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset console.error to original between tests
    console.error = originalConsoleError;
  });
  
  afterAll(() => {
    // Make sure console.error is restored after all tests
    console.error = originalConsoleError;
  });
  
  it('shows loading state initially', () => {
    // Make the promise never resolve to keep component in loading state
    (api.getPlayersList as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    
    render(
      <BrowserRouter>
        <PlayersList />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/loading players/i)).toBeInTheDocument();
  });
  
  it('renders players when API returns data', async () => {
    const mockPlayers = ['player1', 'player2', 'player3'];
    
    (api.getPlayersList as jest.Mock).mockResolvedValue({
      players: mockPlayers
    });
    
    render(
      <BrowserRouter>
        <PlayersList />
      </BrowserRouter>
    );
    
    // Wait for players to appear
    await waitFor(() => {
      expect(screen.getByText(/chess grandmasters/i)).toBeInTheDocument();
    });
    
    // Check for players
    expect(screen.getByText('player1')).toBeInTheDocument();
    expect(screen.getByText('player2')).toBeInTheDocument();
    expect(screen.getByText('player3')).toBeInTheDocument();
  });
  
  it('shows error message when API request fails', async () => {
    // Silence console.error for this test only
    console.error = jest.fn();
    
    (api.getPlayersList as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    render(
      <BrowserRouter>
        <PlayersList />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/failed to load players/i)).toBeInTheDocument();
    });
    
    // Optionally verify that the error was logged
    expect(console.error).toHaveBeenCalled();
  });
});