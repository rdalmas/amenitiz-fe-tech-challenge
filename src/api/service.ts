import { type ChessApiService } from './';
import { type PlayersList, type Player } from '../model';

/**
 * Service for interacting with the Chess.com API
 */
export class ApiService implements ChessApiService {
  private readonly baseUrl = 'https://api.chess.com/pub';

  /**
   * Fetches the list of all Grandmasters
   */
  async getPlayersList(): Promise<PlayersList> {
    try {
      const response = await fetch(`${this.baseUrl}/titled/GM`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch players list: ${response.status}`);
      }
      
      return await response.json() as PlayersList;
    } catch (error) {
      console.error('Error fetching players list:', error);
      throw error;
    }
  }
  
  /**
   * Fetches profile information for a specific player by username
   * @param username The Chess.com username
   */
  async getPlayerProfile(username: string): Promise<Player> {
    try {
      const response = await fetch(`${this.baseUrl}/player/${username}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch player profile: ${response.status}`);
      }
      
      return await response.json() as Player;
    } catch (error) {
      console.error(`Error fetching player profile for ${username}:`, error);
      throw error;
    }
  }
}

// Create a singleton instance of the service
export const chessApiService = new ApiService();