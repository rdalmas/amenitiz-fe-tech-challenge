import { Players } from "../types/players";

// Define the return type for the loader
interface ListLoaderResult {
  players: string[];
  error?: string;
}

/**
 * Server-side loader function to fetch all Players from Chess.com API
 * This runs during SSR and provides data to the List component
 */
export async function listLoader(): Promise<ListLoaderResult> {
  try {
    // Fetch players data from Chess.com API
    const response = await fetch("https://api.chess.com/pub/titled/GM");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch players: ${response.status}`);
    }
    
    // Parse the response as JSON
    const data = await response.json() as Players;
    
    return { players: data.players };
  } catch (error) {
    console.error("Error loading players:", error);
    // Return empty array in case of error
    return { 
      players: [], 
      error: error instanceof Error ? error.message : "Failed to load players" 
    };
  }
}