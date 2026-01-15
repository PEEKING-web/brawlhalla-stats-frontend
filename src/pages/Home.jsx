"use client"

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getSearchHistory, clearSearchHistory } from '../utils/searchHistory'
import { loginWithSteam } from '../services/auth'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()
  const [searchId, setSearchId] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  
  useEffect(() => {
    setSearchHistory(getSearchHistory())
  }, [])

  const handleClearHistory = () => {
    clearSearchHistory()
    setSearchHistory([])
  }

  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchId) navigate(`/player/${searchId}`)
  }

  return (
    <div className="min-h-screen w-full bg-[#050505] relative overflow-hidden flex flex-col font-sans text-white selection:bg-indigo-500/30">
      
      {/* 1. BACKGROUND LAYERS */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Massive Background Watermark */}
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter whitespace-nowrap z-0">
        BRAWLSTATS
      </h1>

      {/* 2. TOP NAVIGATION (HUD STYLE) */}
      <nav className="w-full px-8 py-6 flex justify-between items-center relative z-20 border-b border-white/5 bg-[#050505]/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-sm rotate-45"></div>
            <span className="text-sm font-black tracking-[0.2em] uppercase text-zinc-300">
              BRAWL<span className="text-indigo-500">STATS</span>
            </span>
        </div>
        
        <div className="flex items-center gap-10">
            <a href="https://brawlhalla.wiki.gg" className="hidden md:block text-[10px] font-bold tracking-widest text-zinc-500 hover:text-indigo-400 uppercase transition-colors">
               Wiki.gg
            </a>
            <button 
              onClick={() => {
                if (user) {
                  navigate('/my-profile')
                } else {
                  loginWithSteam()
                }
              }}
              className="px-1 py-1 rounded-full transition-all flex items-center group relative"
            >
              <img
                src="/favicon.png"
                alt="Sign in with Steam"
                className="h-10 w-auto opacity-90 group-hover:opacity-100"
              />
              {user && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              )}
            </button>
        </div>
      </nav>

      {/* 3. MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        
        {/* Main Headings */}
        <div className="text-center mb-12 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-4">
             <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
             <span className="text-[10px] font-bold text-indigo-300 tracking-widest uppercase">Live Season Data</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 leading-[0.9]">
            DECODE <br /> THE META
          </h2>
          
          <p className="text-zinc-500 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
            The most advanced analytics platform for Brawlhalla. 
            Track your elo, analyze replays, and <span className="text-indigo-400">dominate the rankings</span>.
          </p>
        </div>

        {/* Search Module */}
        <div className="w-full max-w-2xl relative group">
          {/* Decorative brackets */}
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-indigo-500/30 group-hover:border-indigo-500 transition-colors"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-indigo-500/30 group-hover:border-indigo-500 transition-colors"></div>

          <form onSubmit={handleSearch} className="relative z-20">
            <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 hover:border-indigo-500/50 transition-colors rounded-sm p-2 shadow-2xl">
              <div className="pl-4 pr-3 text-zinc-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="SEARCH BY BRAWLID...."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 bg-transparent py-4 text-white placeholder-zinc-700 focus:outline-none text-sm font-bold tracking-[0.1em] uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-sm text-[10px] font-black tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]"
              >
                Analyze
              </button>
            </div>
          </form>
        </div>

        {/* Recent Searches */}
        {searchHistory.length > 0 && (
          <div className="mt-8 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-zinc-600">⏱️</span>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Recent Searches</h3>
              </div>
              <button
                onClick={handleClearHistory}
                className="text-[10px] text-zinc-600 hover:text-red-500 font-bold uppercase tracking-wider transition-colors"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {searchHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/player/${item.id}`)}
                  className="bg-[#0a0a0a]/80 border border-white/5 hover:border-indigo-500/30 p-4 rounded-sm text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <p className="text-white font-bold text-sm group-hover:text-indigo-400 transition-colors">
                      {item.name || 'Unknown Player'}
                    </p>
                    <p className="text-zinc-600 text-xs font-mono mt-1">ID: {item.id}</p>
                  </div>
                  <svg className="w-4 h-4 text-zinc-600 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. FOOTER WIDGETS (Grid Layout) */}
        <div className="mt-20 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Widget 1: Steam Login / Profile (Redesigned) */}
            <div 
              onClick={() => {
                if (user) {
                  navigate('/my-profile')
                } else {
                  loginWithSteam()
                }
              }}
              className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-6 rounded-sm flex items-center justify-between hover:bg-[#171a21]/40 hover:border-[#171a21] transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
               {/* Background Glow Effect on Hover */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#66c0f4]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div className="relative z-10 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 mb-2">
                     <span className={`w-2 h-2 rounded-full ${user ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`}></span>
                     <h3 className="text-zinc-500 text-[10px] font-black tracking-[0.2em] uppercase">
                        {user ? 'Link Established' : 'System Access'}
                     </h3>
                  </div>
                  
                  <div className="flex flex-col">
                     <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase group-hover:text-[#66c0f4] transition-colors">
                        {user ? 'View Profile' : 'Login Steam'}
                     </span>
                     <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">
                        {user ? 'Access Operative Data' : 'Sync Account & Stats'}
                     </span>
                  </div>
               </div>

               <div className="relative z-10 pl-4">
                  <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                     <img 
                       src="/steam.png" 
                       alt="Steam" 
                       className="h-20 w-20 md:h-24 md:w-24 opacity-80 group-hover:opacity-100 drop-shadow-[0_0_25px_rgba(102,192,244,0.15)]" 
                     />
                  </div>
               </div>
            </div>

            {/* Widget 2: Meta Question */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-6 rounded-sm relative overflow-hidden group hover:border-white/10 transition-colors">
               <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="text-4xl">⚔️</span>
               </div>
               <h3 className="text-indigo-500 text-[10px] font-black tracking-[0.2em] uppercase mb-2">Meta Watch</h3>
               <p className="text-zinc-300 text-xs md:text-sm font-medium leading-relaxed pr-8">
                  "Rocket Lance win-rates have spiked by 4% since the last patch. Is it time for a counter-strategy or a nerf?"
               </p>
               <button className="mt-3 text-zinc-500 hover:text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-colors">
                  View Discussion <span className="text-indigo-500">→</span>
               </button>
            </div>

        </div>
      </div>

      {/* Footer Line */}
      <div className="w-full text-center py-6 border-t border-white/5 z-20">
        <p className="text-zinc-700 text-[10px] font-bold tracking-[0.2em] uppercase">
          BRAWLSTATS © {new Date().getFullYear()} — ELEVATE YOUR GAMEPLAY
        </p>
      </div>

    </div>
  )
}

export default Home