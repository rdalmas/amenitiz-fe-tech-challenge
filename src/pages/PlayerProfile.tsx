import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/service';
import { type Player } from '../model';
import { Clock } from '../components/Clock';
import './PlayerProfile.css';

const PlayerProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayerProfile() {
      if (!username) return;
      
      try {
        setLoading(true);
        const response = await api.getPlayerProfile(username);
        setPlayer(response);
        setError(null);
      } catch (err) {
        setError('Failed to load player profile. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerProfile();
  }, [username]);

  if (loading) {
    return <div className="loading-container">Loading player profile...</div>;
  }

  if (error || !player) {
    return (
      <div className="error-container">
        <p>{error || 'Player not found'}</p>
        <Link to="/" className="back-link">Back to Grandmasters List</Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Link to="/" className="back-link">← Back to Grandmasters List</Link>
      
      <div className="profile-header">
        {player.avatar && (
          <img 
            src={player.avatar} 
            alt={`${player.username}'s avatar`} 
            className="profile-avatar" 
          />
        )}
        <h2 className="profile-name">{player.name || player.username}</h2>
      </div>
      
      <div className="profile-details">
        <div className="profile-info">
          <h3>Player Information</h3>
          <p><strong>Username:</strong> {player.username}</p>
          <p><strong>Followers:</strong> {player.followers}</p>
          <p><strong>Status:</strong> {player.status}</p>
          <p><strong>Joined:</strong> {new Date(player.joined * 1000).toLocaleDateString()}</p>
        </div>
        
        <div className="last-online-section">
          <h3>Last Online</h3>
          <Clock timestamp={player.last_online} />
        </div>
      </div>
      
      {player.is_streamer && (
        <div className="streamer-badge">Streamer</div>
      )}
    </div>
  );
};

export default PlayerProfile;