import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLeaderboard } from '../services/api'

function Leaderboard() {
  const { region } = useParams()
  const navigate = useNavigate()
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState(region || 'all')

  const regions = [
    { value: 'all', label: 'GLOBAL ARCHIVE' },
    { value: 'us-e', label: 'US EAST' },
    { value: 'us-w', label: 'US WEST' },
    { value: 'eu', label: 'EUROPE' },
    { value: 'sea', label: 'SE ASIA' },
    { value: 'brz', label: 'BRAZIL' },
    { value: 'aus', label: 'AUSTRALIA' },
    { value: 'jpn', label: 'JAPAN' },
    { value: 'sa', label: 'SOUTH AMERICA' },
    { value: 'asn', label: 'ASIA' }
  ]

useEffect(() => {
  if (region && region !== selectedRegion) {
    setSelectedRegion(region);
  }
}, [region]);



useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const data = await getLeaderboard('1v1', selectedRegion, 1)
      setLeaderboardData(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      setLeaderboardData([]) // Set empty array on error
      setLoading(false)
    }
  }
  fetchLeaderboard()
}, [selectedRegion])

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion)
    navigate(`/leaderboard/${newRegion}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center font-mono">
        <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <p className="text-indigo-500 text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">Retrieving Global Rankings...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#050505] relative text-white font-sans selection:bg-indigo-500/30 pb-20 overflow-x-hidden">
      
      {/* BACKGROUND ASSETS */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto p-6 md:p-10 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-indigo-500 rotate-45"></span>
                <span className="text-indigo-500 text-[10px] font-black tracking-[0.3em] uppercase">BrawlStats Database</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                Ranked <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">1v1 Elite</span>
              </h1>
            </div>

            {/* TECHNICAL REGION SELECTOR */}
            <div className="relative group">
              <label className="absolute -top-2 left-3 bg-[#050505] px-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest z-10">
                Network Node
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="bg-[#0a0a0a] text-white pl-4 pr-10 py-4 rounded-sm border border-white/10 focus:outline-none focus:border-indigo-500 font-mono text-xs font-bold appearance-none cursor-pointer hover:bg-zinc-900 transition-all min-w-[200px] uppercase tracking-widest"
              >
                {regions.map(r => (
                  <option key={r.value} value={r.value} className="bg-[#0a0a0a]">{r.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* DATA TABLE MODULE */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 rounded-sm overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  {['Rank', 'Operative', 'Node', 'Rating', 'Peak', 'Wins', 'Total Games'].map((header) => (
                    <th key={header} className="px-6 py-5 text-left text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {leaderboardData.map((player) => (
                  <tr 
                    key={player.brawlhalla_id}
                    className="group hover:bg-indigo-500/[0.03] cursor-pointer transition-all duration-150"
                    onClick={() => navigate(`/player/${player.brawlhalla_id}`)}
                  >
                    {/* Rank */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-700 font-mono text-[10px]">#</span>
                        <span className={`text-sm font-black italic ${player.rank <= 3 ? 'text-indigo-400' : 'text-white'}`}>
                          {player.rank}
                        </span>
                      </div>
                    </td>
                    
                    {/* Player Name */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                          {player.name}
                        </span>
                        <span className="text-[9px] text-zinc-600 font-mono">UID_{player.brawlhalla_id}</span>
                      </div>
                    </td>

                    {/* Region */}
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-black text-zinc-500 bg-white/5 px-2 py-1 rounded-sm uppercase tracking-widest">
                        {player.region}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-5 text-sm font-mono font-black text-white italic">
                      {player.rating}
                    </td>

                    {/* Peak */}
                    <td className="px-6 py-5 text-sm font-mono text-zinc-500">
                      {player.peak_rating}
                    </td>

                    {/* Wins */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-emerald-500 italic">{player.wins}</span>
                        <div className="w-full bg-emerald-500/10 h-[2px] mt-1 overflow-hidden">
                           <div className="bg-emerald-500 h-full w-2/3 opacity-50"></div>
                        </div>
                      </div>
                    </td>

                    {/* Games */}
                    <td className="px-6 py-5 text-sm font-mono text-zinc-400 italic">
                      {player.games}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {leaderboardData.length === 0 && (
            <div className="text-center py-20 bg-black/20">
              <div className="inline-block p-4 border border-dashed border-white/10 rounded-sm">
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
                  No Data Packets Found For This Sector
                </p>
              </div>
            </div>
          )}
        </div>

        {/* DECORATIVE FOOTER TAG */}
        <div className="mt-8 flex justify-between items-center opacity-30">
           <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10 mr-4"></div>
           <span className="font-mono text-[9px] tracking-[0.5em] text-zinc-500 uppercase">Archive_End_Line</span>
           <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10 ml-4"></div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard