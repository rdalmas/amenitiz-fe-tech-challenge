import { Player } from "../types/players";
import { LoaderFunctionArgs } from "react-router";

// Define the return type for the loader
interface ProfileLoaderResult {
  player: Player | null;
  error?: string;
}

/**
 * Server-side loader function to fetch a specific player's profile from Chess.com API
 * This runs during SSR and provides data to the Profile component
 */
export async function profileLoader({ params }: LoaderFunctionArgs): Promise<ProfileLoaderResult> {
  try {
    const { username } = params;
    
    if (!username) {
      throw new Error("Username is required");
    }
    
    // Fetch player data from Chess.com API
    const response = await fetch(`https://api.chess.com/pub/player/${username}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Player "${username}" not found`);
      }
      throw new Error(`Failed to fetch player: ${response.status}`);
    }
    
    // Parse the response as JSON
    const player = await response.json() as Player;
    
    return { player };
  } catch (error) {
    console.error(`Error loading player profile:`, error);
    // Return error information
    return { 
      player: null, 
      error: error instanceof Error ? error.message : "Failed to load player profile" 
    };
  }
}