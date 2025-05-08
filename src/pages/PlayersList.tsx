import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/service';
import { InfiniteScroll } from '../components/InfiniteScroll';
import './PlayersList.css';

const PlayersList = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [visiblePlayers, setVisiblePlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const playersPerPage = 20;

  // Fetch all players on component mount
  useEffect(() => {
    async function fetchPlayers() {
      try {
        setLoading(true);
        const response = await api.getPlayersList();
        
        setPlayers(response.players);
        setVisiblePlayers(response.players.slice(0, playersPerPage));
        setHasMore(response.players.length > playersPerPage);
        setError(null);
      } catch (err) {
        setError('Failed to load players. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  // Function to load more players
  const loadMorePlayers = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    console.log('Loading more players, current page:', page);
    
    // Short timeout to avoid UI freezing
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * playersPerPage;
      const endIndex = startIndex + playersPerPage;
      const nextBatch = players.slice(startIndex, endIndex);
      
      console.log(`Loading players ${startIndex} to ${endIndex}, found: ${nextBatch.length}`);
      
      if (nextBatch.length === 0) {
        setHasMore(false);
      } else {
        setVisiblePlayers(prev => [...prev, ...nextBatch]);
      }
      
      setPage(nextPage);
      setLoading(false);
    }, 300);
  }, [loading, hasMore, page, players, playersPerPage]);

  if (loading && players.length === 0) {
    return <div className="loading-container">Loading players...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="players-container">
      <div className="players-header">
        <h2>Chess Grandmasters</h2>
        <p className="players-count">
          Showing {visiblePlayers.length} of {players.length} Players
        </p>
      </div>
      
      <InfiniteScroll
        items={visiblePlayers}
        renderItem={(username) => (
          <Link to={`/player/${username}`} className="player-card">
            <div className="player-username">{username}</div>
          </Link>
        )}
        keyExtractor={(username) => username}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMorePlayers}
        loadingIndicator={<div className="loading-more">Loading more players...</div>}
        endMessage={<div className="end-message">You've reached the end of the list</div>}
      />
    </div>
  );
};

export default PlayersList;