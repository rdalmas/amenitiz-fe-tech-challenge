import { useState, useEffect } from 'react';
import { getTimeSinceTimestamp, formatTimeDuration } from '../utils/time';
import './Clock.css';

interface ClockProps {
  timestamp: number;
}

export const Clock = ({ timestamp }: ClockProps) => {
  const [timeDisplay, setTimeDisplay] = useState<string>('');
  
  useEffect(() => {
    // Update the clock immediately
    updateClock();
    
    // Then update every second
    const interval = setInterval(updateClock, 1000);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
    
    function updateClock() {
      const duration = getTimeSinceTimestamp(timestamp);
      setTimeDisplay(formatTimeDuration(duration));
    }
  }, [timestamp]);
  
  return (
    <div className="clock">
      <div className="time-display">{timeDisplay}</div>
      <div className="time-label">since last online</div>
    </div>
  );
};