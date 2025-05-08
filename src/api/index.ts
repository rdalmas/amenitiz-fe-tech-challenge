import { type PlayersList, type Player } from '../model';

export interface ChessApiService {
  /**
   * Fetches the list of all Grandmasters
   */
  getPlayersList(): Promise<PlayersList>;
  
  /**
   * Fetches profile information for a specific player by username
   * @param username The Chess.com username
   */
  getPlayerProfile(username: string): Promise<Player>;
}