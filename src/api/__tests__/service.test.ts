import { api } from '../service';

// Create a proper mock for fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPlayersList', () => {
    it('should fetch players list from the API', async () => {
      // Setup mock response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ players: ['player1', 'player2'] })
      });

      const result = await api.getPlayersList();
      
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/titled/GM'));
      expect(result).toEqual({ players: ['player1', 'player2'] });
    });

    it('should throw an error if the API request fails', async () => {
      // Temporarily silence console.error for this test
      const originalConsoleError = console.error;
      console.error = jest.fn();
      
      try {
        // Setup mock error response
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });

        await expect(api.getPlayersList()).rejects.toThrow('Failed to fetch players list');
        
        // Verify console.error was called (optional)
        expect(console.error).toHaveBeenCalled();
      } finally {
        // Restore original console.error
        console.error = originalConsoleError;
      }
    });
  });
});