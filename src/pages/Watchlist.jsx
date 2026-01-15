import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFavorites, removeFavorite } from '../services/features';
import { getTrackedPlayers, untrackPlayer, updateTrackedPlayer } from '../services/features';

function Watchlist() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [tracked, setTracked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [favData, trackData] = await Promise.all([
        getFavorites(),
        getTrackedPlayers()
      ]);
      setFavorites(favData);
      setTracked(trackData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (brawlhallaId) => {
    if (!confirm('Remove from watchlist?')) return;
    try {
      await removeFavorite(brawlhallaId);
      fetchData();
    } catch (error) {
      alert('Failed to remove');
    }
  };

  const handleUntrack = async (brawlhallaId) => {
    if (!confirm('Stop tracking this player?')) return;
    try {
      await untrackPlayer(brawlhallaId);
      fetchData();
    } catch (error) {
      alert('Failed to untrack');
    }
  };

  const handleUpdate = async (brawlhallaId) => {
    setUpdating({ ...updating, [brawlhallaId]: true });
    try {
      await updateTrackedPlayer(brawlhallaId);
      fetchData();
    } catch (error) {
      alert('Failed to update');
    } finally {
      setUpdating({ ...updating, [brawlhallaId]: false });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#050505] relative text-white pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto p-6 md:p-10 relative z-10">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-indigo-500 rotate-45"></span>
            <span className="text-indigo-500 text-[10px] font-black tracking-[0.3em] uppercase">Surveillance System</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            WATCH<span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">LIST</span>
          </h1>
        </div>

        {/* Favorites Section */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
            <span className="text-amber-500">★</span> FAVORITES
          </h2>
          
          {favorites.length === 0 ? (
            <div className="bg-zinc-900/40 border border-white/5 rounded-sm p-12 text-center">
              <p className="text-zinc-600 text-[10px] uppercase tracking-wider">NO FAVORITES YET</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-zinc-900/40 border border-white/5 hover:border-amber-500/30 rounded-sm p-6 transition-all group cursor-pointer"
                  onClick={() => navigate(`/player/${fav.brawlhallaId}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">
                        {fav.playerName}
                      </h3>
                      <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider">UID_{fav.brawlhallaId}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(fav.brawlhallaId);
                      }}
                      className="text-zinc-600 hover:text-red-500 text-sm transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-zinc-700 text-[9px] uppercase tracking-wider">
                    Added: {new Date(fav.addedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tracked Players Section */}
        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
            <span className="text-emerald-500">📊</span> RANK TRACKING
          </h2>
          
          {tracked.length === 0 ? (
            <div className="bg-zinc-900/40 border border-white/5 rounded-sm p-12 text-center">
              <p className="text-zinc-600 text-[10px] uppercase tracking-wider">NO TRACKED PLAYERS</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tracked.map((player) => (
                <div
                  key={player.id}
                  className="bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 rounded-sm p-6 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => navigate(`/player/${player.brawlhallaId}`)}
                    >
                      <h3 className="text-lg font-bold text-white hover:text-emerald-400 transition-colors uppercase tracking-tight">
                        {player.playerName}
                      </h3>
                      <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider">UID_{player.brawlhallaId}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-wider">Rating</p>
                        <p className="text-3xl font-black text-emerald-400 italic">{player.currentRating || 'N/A'}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(player.brawlhallaId)}
                          disabled={updating[player.brawlhallaId]}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white rounded-sm text-[10px] font-black uppercase tracking-wider transition-all"
                        >
                          {updating[player.brawlhallaId] ? '...' : '🔄'}
                        </button>
                        <button
                          onClick={() => handleUntrack(player.brawlhallaId)}
                          className="px-4 py-2 bg-zinc-800 hover:bg-red-600 text-white rounded-sm text-[10px] font-black uppercase tracking-wider transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Rank History Preview */}
                  {player.rankHistory && player.rankHistory.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-wider mb-2">RECENT HISTORY</p>
                      <div className="flex gap-2 overflow-x-auto">
                        {player.rankHistory.slice(0, 5).map((record) => (
                          <div key={record.id} className="bg-black/20 border border-white/5 rounded-sm p-2 min-w-[80px]">
                            <p className="text-emerald-400 text-sm font-bold">{record.rating}</p>
                            <p className="text-zinc-600 text-[9px]">{new Date(record.recordedAt).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Watchlist;