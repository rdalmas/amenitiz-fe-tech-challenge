/**
 * Response from https://api.chess.com/pub/titled/GM endpoint
 * Lists all grandmaster usernames
 */
export interface PlayersList {
    players: string[];
  }
  
  /**
   * Response from https://api.chess.com/pub/player/{username} endpoint
   * Contains details about a specific player
   */
  export interface Player {
    player_id: number;
    username: string;
    name: string;
    avatar: string;
    url: string;
    
    // Status and statistics
    followers: number;
    status: string;
    is_streamer: boolean;
    verified: boolean;
    league: string;
    streaming_platforms?: string[];
  
    // Country info
    country: string;
    
    // Timestamps (in Unix timestamp format)
    last_online: number; // When the player was last online
    joined: number; // When the player joined Chess.com
    
    // Other fields
    "@id": string; // API URL for this player
  }
  
  /**
   * Type for time duration display
   * Used for "time since last online" clock
   */
  export interface TimeDuration {
    hours: number;
    minutes: number;
    seconds: number;
    timestamp: number; // Original timestamp for calculations
  }