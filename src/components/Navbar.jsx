import { Link, useLocation } from "react-router-dom"
import { useState } from "react"


function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  
  // Helper to check active state for styling
  const isActive = (path) => location.pathname === path

  return (
    <>
  

      <nav className={`
        bg-[#050505] w-64 min-h-screen fixed left-0 top-0 border-r border-white/5 flex flex-col z-50
        transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Background Tech Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

        {/* HEADER / LOGO AREA */}
        <div className="p-8 pb-10 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50"></div>
          
          <h1 className="text-xl font-black text-white tracking-widest uppercase italic relative z-10">
            BRAWL<span className="text-indigo-500">STATS</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] font-bold">System Online</p>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <div className="px-4 space-y-2 relative z-10">
          <p className="px-4 text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em] mb-2">Modules</p>
          
          {/* Home Link */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`group flex items-center gap-4 px-4 py-3 border-l-2 transition-all duration-300 ${
              isActive('/') 
                ? 'border-indigo-500 bg-indigo-500/5 text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] hover:border-zinc-700'
            }`}
          >
            {/* Tech Icon: Dashboard */}
            <svg className={`w-4 h-4 ${isActive('/') ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Home</span>
          </Link>
            
            
            {/* Myprofile link*/}


          <Link
            to="/my-profile"
            onClick={() => setIsOpen(false)}
            className={`group flex items-center gap-4 px-4 py-3 border-l-2 transition-all duration-300 ${
              isActive('/my-profile') 
                ? 'border-indigo-500 bg-indigo-500/5 text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] hover:border-zinc-700'
            }`}
          >
            <svg className={`w-4 h-4 ${isActive('/my-profile') ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">My Profile</span>
          </Link>

                  <Link
          to="/watchlist"
          onClick={() => setIsOpen(false)}
          className={`group flex items-center gap-4 px-4 py-3 border-l-2 transition-all duration-300 ${
            isActive('/watchlist') 
              ? 'border-indigo-500 bg-indigo-500/5 text-white' 
              : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] hover:border-zinc-700'
          }`}
        >
          <svg className={`w-4 h-4 ${isActive('/watchlist') ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Watchlist</span>
        </Link>

          
          {/* Leaderboard Link */}
          <Link
            to="/leaderboard/all"
            onClick={() => setIsOpen(false)}
            className={`group flex items-center gap-4 px-4 py-3 border-l-2 transition-all duration-300 ${
              isActive('/leaderboard/all') 
                ? 'border-indigo-500 bg-indigo-500/5 text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] hover:border-zinc-700'
            }`}
          >
            {/* Tech Icon: Charts */}
            <svg className={`w-4 h-4 ${isActive('/leaderboard/all') ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Leaderboard</span>
          </Link>
        </div>

        {/* REGIONS SECTION */}
        <div className="mt-12 px-4 relative z-10">
          <div className="flex items-center justify-between px-4 mb-4">
             <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]">Server Nodes</p>
             <span className="text-[8px] text-zinc-800 font-mono">V.2.0</span>
          </div>
          
          <ul className="space-y-1">
            {['US-E', 'US-W', 'EU', 'SEA', 'BRZ', 'AUS'].map((region) => (
              <li key={region}>
                <Link
                  to={`/leaderboard/${region.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between px-4 py-2 text-xs text-zinc-600 hover:text-white hover:bg-white/[0.02] transition-all duration-200 border border-transparent hover:border-white/5 rounded-sm"
                >
                  <div className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-zinc-800 group-hover:bg-indigo-500 transition-colors"></span>
                      <span className="font-mono text-[10px] font-bold tracking-wider">{region}</span>
                  </div>
                  <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 font-mono">
                      CONN_OK
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* DECORATIVE BOTTOM */}
        <div className="mt-auto p-6 border-t border-white/5">
          <div className="bg-zinc-900/50 p-3 border border-white/5 rounded-sm">
               <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                      <span className="text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Database</span>
                      <span className="text-[10px] text-zinc-300 font-mono">SYNCED</span>
                  </div>
                  <div className="w-2 h-2 bg-indigo-500/20 rounded-sm overflow-hidden relative">
                      <div className="absolute inset-0 bg-indigo-500 animate-ping opacity-75"></div>
                  </div>
               </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar