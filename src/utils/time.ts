import { type TimeDuration } from '../model';

/**
 * Calculates the time duration between now and a given timestamp
 * @param timestamp Unix timestamp in seconds
 * @returns TimeDuration object with hours, minutes, and seconds
 */
export function getTimeSinceTimestamp(timestamp: number): TimeDuration {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const diffInSeconds = now - timestamp;
  
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;
  
  return {
    hours,
    minutes,
    seconds,
    timestamp
  };
}

/**
 * Formats a TimeDuration object as HH:MM:SS
 * @param duration TimeDuration object
 * @returns Formatted time string
 */
export function formatTimeDuration(duration: TimeDuration): string {
  const { hours, minutes, seconds } = duration;
  
  // Pad with leading zeros if needed
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');
  
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}