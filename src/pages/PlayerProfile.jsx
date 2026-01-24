import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPlayerStats, getPlayerRanked } from '../services/api'
import RankedSection from '../components/RankedSection'
import GeneralStats from '../components/GeneralStats'
import UnarmedStats from '../components/UnarmedStats'
import WeaponThrows from '../components/WeaponThrows'
import GadgetsStats from '../components/GadgetsStats'
import ClanSection from '../components/ClanSection'
import Ranked2v2Section from '../components/Ranked2v2Section'
import LegendsTab from '../components/LegendsTab'
import WeaponsTab from '../components/WeaponsTab'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { addToSearchHistory } from '../utils/searchHistory'
import CompareButton from '../components/CompareButton'
import FavoriteButton from '../components/FavoriteButton'
import TrackButton from '../components/TrackButton'
import PlayerNotes from '../components/PlayerNotes'


function PlayerProfile() {
  const { id } = useParams()
  const [playerData, setPlayerData] = useState(null)
  const [rankedData, setRankedData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [error, setError] = useState(null)


useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const stats = await getPlayerStats(id)
      const ranked = await getPlayerRanked(id)
      setPlayerData(stats)
      setRankedData(ranked)
      addToSearchHistory(id, stats.name)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching player:', error)
      setError(error.message || 'Failed to load player data. Please check the ID and try again.')
      setLoading(false)
    }
  }

  fetchData()
}, [id])

  // --- LOADING STATE (SYSTEM BOOT STYLE) ---
  if (loading) {
    return (
      
      <div className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden font-mono">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
           <div className="text-indigo-500 text-xs font-bold tracking-[0.2em] animate-pulse">
              INITIALIZING DATA STREAM...
           </div>
           <div className="text-zinc-600 text-[10px] uppercase tracking-widest">
              Decrypting Player ID: {id}
           </div>
        </div>
      </div>
    )
  }

  // --- ERROR STATE (SYSTEM FAILURE STYLE) ---
  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center relative font-mono">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)] pointer-events-none" />
         <div className="border border-red-900/50 bg-red-900/10 p-8 rounded-sm text-center backdrop-blur-md">
            <h2 className="text-red-500 text-2xl font-black tracking-[0.2em] mb-2">ERROR 404</h2>
            <p className="text-red-400/70 text-xs uppercase tracking-widest mb-6">Operative data not found in archive</p>
            <button 
               onClick={() => window.location.href = '/'}
               className="text-white bg-red-600 hover:bg-red-500 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
            >
               Return to Base
            </button>
         </div>
      </div>
    )
  }

  // --- DATA CALCULATIONS ---
  const legends = playerData.legends || []
  let totalMatchtime = 0
  legends.forEach(legend => {
    totalMatchtime += Number(legend.matchtime) || 0
  })

  const totalHours = Math.floor(totalMatchtime / 3600)
  const totalMinutes = Math.floor((totalMatchtime % 3600) / 60)

  const tabs = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: '2v2', label: '2V2 RANKED' },
    { id: 'legends', label: 'LEGENDS' },
    { id: 'weapons', label: 'WEAPONS' }
  ]

  return (
    <div className="min-h-screen w-full bg-[#050505] relative text-white font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* 1. BACKGROUND LAYERS */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto p-6 md:p-10 relative z-10">
        
        {/* 2. PLAYER DOSSIER HEADER */}
        <header className="mb-10 relative">
           {/* Decorative Top Line */}
           <div className="absolute -top-6 left-0 w-full h-px bg-gradient-to-r from-indigo-500/50 via-white/10 to-transparent"></div>
           
           {/* Main Header - Name and Status */}
           <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-indigo-500 text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm">
                   Subject
                </span>
                <span className="text-zinc-500 font-mono text-xs tracking-widest">
                   ID: {id}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9] break-words">
                {playerData.name}
              </h1>
              
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                   Connection Established
                </span>
              </div>
           </div>

           {/* Action Buttons */}
           <div className="flex flex-wrap gap-2 mb-6">
              <CompareButton playerId={id} playerName={playerData.name} />
              <FavoriteButton playerId={id} playerName={playerData.name} />
              <TrackButton playerId={id} playerName={playerData.name} />
           </div>

           {/* Quick Stats Ribbon - Now Below Buttons */}
           <div className="w-full">
              <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
                
                {/* Stat 1 */}
                <div className="bg-[#0a0a0a] p-4 flex flex-col items-center justify-center group hover:bg-[#0f0f0f] transition-colors">
                   <span className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Clearance Lvl</span>
                   <span className="text-2xl font-mono font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {playerData.level}
                   </span>
                </div>

                {/* Stat 2 */}
                <div className="bg-[#0a0a0a] p-4 flex flex-col items-center justify-center group hover:bg-[#0f0f0f] transition-colors">
                   <span className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Total XP</span>
                   <span className="text-2xl font-mono font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {playerData.xp?.toLocaleString()}
                   </span>
                </div>

                {/* Stat 3 */}
                <div className="bg-[#0a0a0a] p-4 flex flex-col items-center justify-center group hover:bg-[#0f0f0f] transition-colors">
                   <span className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Field Time</span>
                   <span className="text-2xl font-mono font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {totalHours}<span className="text-sm text-zinc-600">H</span>
                   </span>
                </div>

              </div>
           </div>
        </header>

        {/* 3. NAVIGATION MODULE */}
        <div className="mb-8 border-b border-white/5">
           <div className="flex flex-wrap gap-8">
              {tabs.map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 relative text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                       activeTab === tab.id
                          ? 'text-indigo-400'
                          : 'text-zinc-600 hover:text-white'
                    }`}
                 >
                    {tab.label}
                    {/* Active Indicator Line */}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500 transition-transform duration-300 ${
                       activeTab === tab.id ? 'scale-x-100' : 'scale-x-0'
                    }`} />
                 </button>
              ))}
           </div>
        </div>

        {/* 4. MAIN DATA DISPLAY */}
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Sector A: Ranked Performance */}
              <section className="relative">
                 <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
                 <RankedSection rankedData={rankedData} playerData={playerData} />
              </section>

              {/* Sector B: Grid Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start mt-8">
                
                {/* Main Stats Panel (8 cols) */}
                <div className="xl:col-span-8 space-y-6">
                   <div className="bg-[#0a0a0a] border border-white/5 p-1 rounded-sm">
                      <GeneralStats playerData={playerData} />
                   </div>
                </div>

                {/* Side Tech Panel (4 cols) */}
                <div className="xl:col-span-4 space-y-4">
                  
                  {/* Clan Widget */}
                  <div className="bg-[#0a0a0a]/50 border border-white/5 p-6 rounded-sm backdrop-blur-sm">
                     <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-1 h-1 bg-indigo-500 rounded-full"></span> Clan Affiliation
                     </h3>
                     <ClanSection playerData={playerData} />
                  </div>
                  
                  {/* Player Notes */}
                  <PlayerNotes playerId={id} playerName={playerData.name} />

                  {/* Secondary Stats */}
                  <div className="space-y-4">
                     <UnarmedStats playerData={playerData} />
                     <WeaponThrows playerData={playerData} />
                     <GadgetsStats playerData={playerData} />
                  </div>

                </div>
              </div>
            </div>
          )}

          {activeTab === '2v2' && (
            <div className="bg-[#0a0a0a]/50 border border-white/5 p-6 rounded-sm">
              <Ranked2v2Section rankedData={rankedData} />
            </div>
          )}

          {activeTab === 'legends' && (
            <div className="bg-[#0a0a0a]/50 border border-white/5 p-6 rounded-sm">
              <LegendsTab playerData={playerData} />
            </div>
          )}

         {activeTab === 'weapons' && (
            <div className="w-full mt-6">
               <WeaponsTab playerData={playerData} />
            </div>
         )}
        </main>
      </div>
    </div>
  )
}

export default PlayerProfile