import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { linkBrawlhallaAccount, unlinkBrawlhallaAccount } from '../services/auth';
import { getPlayerStats, getPlayerRanked } from '../services/api';
import PlayerProfile from './PlayerProfile';

function MyProfile() {
  const { user, loading: authLoading, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [linkMode, setLinkMode] = useState(false);
  const [brawlhallaId, setBrawlhallaId] = useState('');
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [rankedData, setRankedData] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user?.brawlhallaId) {
      fetchBrawlhallaStats();
    }
  }, [user?.brawlhallaId]);

  const fetchBrawlhallaStats = async () => {
    if (!user?.brawlhallaId) return;
    
    try {
      setLoadingStats(true);
      const [stats, ranked] = await Promise.all([
        getPlayerStats(user.brawlhallaId),
        getPlayerRanked(user.brawlhallaId)
      ]);
      setPlayerData(stats);
      setRankedData(ranked);
    } catch (err) {
      console.error('Failed to fetch Brawlhalla stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLink = async (e) => {
    e.preventDefault();
    if (!brawlhallaId.trim()) return;

    try {
      setLinking(true);
      setError('');
      await linkBrawlhallaAccount(brawlhallaId);
      await refreshUser();
      setLinkMode(false);
      setBrawlhallaId('');
    } catch (err) {
      setError(err.error || 'Failed to link account. Please check the Brawlhalla ID.');
    } finally {
      setLinking(false);
    }
  };

  const handleUnlink = async () => {
    if (!confirm('Are you sure you want to unlink your Brawlhalla account?')) return;

    try {
      await unlinkBrawlhallaAccount();
      await refreshUser();
      setPlayerData(null);
      setRankedData(null);
    } catch (err) {
      alert('Failed to unlink account');
    }
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  // If Brawlhalla account is linked and we have stats, show the full player profile
  if (user.brawlhallaId && playerData) {
    return (
      <div className="relative">
        {/* Floating User Card */}
        <div className="fixed top-4 right-4 z-50 bg-[#0a0a0a] border border-white/10 rounded-sm p-4 flex items-center gap-4 backdrop-blur-md">
          <img 
            src={user.avatar} 
            alt={user.displayName}
            className="w-12 h-12 rounded-sm border-2 border-indigo-500"
          />
          <div>
            <p className="text-white font-bold text-sm">{user.displayName}</p>
            <p className="text-zinc-500 text-xs font-mono">Steam ID: {user.steamId}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleUnlink}
              className="text-[9px] text-orange-500 hover:text-orange-400 font-bold uppercase tracking-wider"
            >
              Unlink
            </button>
            <button
              onClick={handleLogout}
              className="text-[9px] text-red-500 hover:text-red-400 font-bold uppercase tracking-wider"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Show PlayerProfile component but pass the data as props */}
        <PlayerProfileWrapper 
          playerId={user.brawlhallaId}
          initialPlayerData={playerData}
          initialRankedData={rankedData}
        />
      </div>
    );
  }

  // Main account page (no Brawlhalla linked yet)
  return (
    <div className="min-h-screen w-full bg-[#050505] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto p-10 relative z-10">
        
        {/* User Header */}
        <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-sm p-8 mb-8 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img 
                src={user.avatar} 
                alt={user.displayName}
                className="w-24 h-24 rounded-sm border-4 border-indigo-500"
              />
              <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                  {user.displayName}
                </h1>
                <p className="text-zinc-500 text-sm font-mono">Steam ID: {user.steamId}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">
                    Authenticated
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-sm text-xs font-black uppercase tracking-wider transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Link Brawlhalla Account Section */}
        <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-sm p-8 backdrop-blur-md">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
            Link Your <span className="text-indigo-500">Brawlhalla</span> Account
          </h2>

          {!linkMode ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎮</div>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                Connect your Brawlhalla account to view your stats, track your progress, and analyze your gameplay.
              </p>
              <button
                onClick={() => setLinkMode(true)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm text-sm font-black uppercase tracking-wider transition-all"
              >
                Link Brawlhalla Account
              </button>
            </div>
          ) : (
            <div>
              <p className="text-zinc-400 mb-6">
                Enter your Brawlhalla ID to link your account. You can find your Brawlhalla ID in-game or by searching for your profile.
              </p>

              <form onSubmit={handleLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Brawlhalla ID
                  </label>
                  <input
                    type="text"
                    value={brawlhallaId}
                    onChange={(e) => setBrawlhallaId(e.target.value)}
                    placeholder="Enter your Brawlhalla ID..."
                    className="w-full bg-black/20 border border-white/10 rounded-sm px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={linking || !brawlhallaId.trim()}
                    className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-sm text-sm font-black uppercase tracking-wider transition-all"
                  >
                    {linking ? 'Linking...' : 'Link Account'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkMode(false);
                      setError('');
                      setBrawlhallaId('');
                    }}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-sm text-sm font-black uppercase tracking-wider transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-sm">
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                  💡 How to find your Brawlhalla ID:
                </p>
                <ul className="text-zinc-400 text-sm space-y-1">
                  <li>• Search for any player on the home page</li>
                  <li>• Your Brawlhalla ID appears in the URL</li>
                  <li>• Or check in-game profile settings</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Wrapper component to show PlayerProfile with pre-loaded data
function PlayerProfileWrapper({ playerId, initialPlayerData, initialRankedData }) {
  // This is a simplified version - you could create a modified PlayerProfile
  // For now, we'll redirect to the actual player profile page
  useEffect(() => {
    // Just show it in the current context
  }, []);

  // Import the actual PlayerProfile component and render it inline
  // Or create a custom view here with the same components
  return (
    <div className="min-h-screen w-full bg-[#050505] relative text-white font-sans selection:bg-indigo-500/30 pb-20">
      {/* You can either redirect or render PlayerProfile content here */}
      {/* For simplicity, let's just import components and display them */}
      <div className="max-w-[1600px] mx-auto p-6 md:p-10 relative z-10">
        <div className="text-center py-20">
          <h1 className="text-4xl font-black text-white mb-4">
            YOUR <span className="text-indigo-500">STATS</span>
          </h1>
          <p className="text-zinc-500 mb-8">
            Viewing stats for Brawlhalla ID: {playerId}
          </p>
          <button
            onClick={() => window.location.href = `/player/${playerId}`}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm text-sm font-black uppercase tracking-wider transition-all"
          >
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;