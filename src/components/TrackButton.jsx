import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { trackPlayer, untrackPlayer, checkTracking } from '../services/features';

function TrackButton({ playerId, playerName }) {
  const { user } = useAuth();
  const [isTracked, setIsTracked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && playerId) {
      checkTrackingStatus();
    }
  }, [user, playerId]);

  const checkTrackingStatus = async () => {
    try {
      const result = await checkTracking(playerId);
      setIsTracked(result.isTracked);
    } catch (error) {
      console.error('Error checking tracking:', error);
    }
  };

  const toggleTracking = async () => {
    if (!user) {
      alert('Please login to track players');
      return;
    }

    try {
      setLoading(true);
      if (isTracked) {
        await untrackPlayer(playerId);
        setIsTracked(false);
      } else {
        await trackPlayer(playerId, playerName);
        setIsTracked(true);
      }
    } catch (error) {
      console.error('Error toggling tracking:', error);
      alert(error.response?.data?.error || 'Failed to update tracking');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={toggleTracking}
      disabled={loading}
      className={`px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all border ${
        isTracked
          ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
          : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-emerald-500/50 hover:text-emerald-400'
      } disabled:opacity-50`}
    >
      {loading ? '...' : isTracked ? '✓ RANK TRACKING' : '📊 TRACK RANK'}
    </button>
  );
}

export default TrackButton;