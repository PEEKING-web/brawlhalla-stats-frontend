import { useState } from "react"

function LegendsTab({ playerData }) {
  const [sortBy, setSortBy] = useState("games")

  const legends = playerData.legends || []
  const sortedLegends = [...legends].sort((a, b) => {
    switch (sortBy) {
      case "level": return (b.level || 0) - (a.level || 0)
      case "games": return (b.games || 0) - (a.games || 0)
      case "wins": return (b.wins || 0) - (a.wins || 0)
      case "winrate":
        const wa = a.games > 0 ? a.wins / a.games : 0
        const wb = b.games > 0 ? b.wins / b.games : 0
        return wb - wa
      default: return 0
    }
  })

  const playedLegends = sortedLegends.filter((legend) => legend.games > 0)

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Legends</h2>
            <p className="text-zinc-500 mt-1">Performance by character</p>
        </div>
        
        <div className="flex items-center gap-3 bg-zinc-900 p-1 rounded-xl border border-white/10">
          {["games", "level", "wins", "winrate"].map(opt => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === opt 
                    ? "bg-zinc-800 text-white shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playedLegends.map((legend) => {
          const winRate = legend.games > 0 ? ((legend.wins / legend.games) * 100).toFixed(1) : 0
          const kdr = legend.falls > 0 ? (legend.kos / legend.falls).toFixed(2) : legend.kos

          return (
            <div key={legend.legend_id} className="group bg-zinc-900/40 hover:bg-zinc-800/40 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white capitalize">{legend.legend_name_key}</h3>
                  <div className="flex items-center gap-2 mt-1">
                      <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded">Lvl {legend.level}</span>
                      <span className="text-zinc-600 text-xs">{Number(legend.xp || 0).toLocaleString()} XP</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5 font-bold text-sm text-zinc-400">
                    {legend.games}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Win Rate</span>
                    <span className={Number(winRate) >= 50 ? "text-emerald-400 font-bold" : "text-zinc-300"}>{winRate}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${Number(winRate) >= 50 ? 'bg-emerald-500' : 'bg-zinc-600'}`} style={{ width: `${winRate}%` }}></div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
                    <div className="text-center">
                        <p className="text-xs text-zinc-600 uppercase mb-1">KDR</p>
                        <p className="text-white font-medium">{kdr}</p>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <p className="text-xs text-zinc-600 uppercase mb-1">KOs</p>
                        <p className="text-white font-medium">{legend.kos}</p>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <p className="text-xs text-zinc-600 uppercase mb-1">DMG</p>
                        <p className="text-white font-medium">{(legend.damagedealt / 1000).toFixed(0)}k</p>
                    </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LegendsTab