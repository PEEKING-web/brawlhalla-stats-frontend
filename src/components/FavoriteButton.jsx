import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addFavorite, removeFavorite, checkFavorite } from '../services/features';

function FavoriteButton({ playerId, playerName }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && playerId) {
      checkFavoriteStatus();
    }
  }, [user, playerId]);

  const checkFavoriteStatus = async () => {
    try {
      const result = await checkFavorite(playerId);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      alert('Please login to add favorites');
      return;
    }

    try {
      setLoading(true);
      if (isFavorite) {
        await removeFavorite(playerId);
        setIsFavorite(false);
      } else {
        await addFavorite(playerId, playerName);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert(error.response?.data?.error || 'Failed to update favorite');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all border ${
        isFavorite
          ? 'bg-amber-600 text-white border-amber-500 hover:bg-amber-500'
          : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-amber-500/50 hover:text-amber-400'
      } disabled:opacity-50`}
    >
      {loading ? '...' : isFavorite ? '★ IN WATCHLIST' : '☆ ADD TO WATCHLIST'}
    </button>
  );
}

export default FavoriteButton;