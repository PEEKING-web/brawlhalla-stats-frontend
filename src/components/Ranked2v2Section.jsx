function Ranked2v2Section({ rankedData }) {
  if (!rankedData || !rankedData["2v2"] || rankedData["2v2"].length === 0) {
    return null
  }

  const teams = rankedData["2v2"]

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-indigo-500">2v2</span> Teams
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {teams.map((team, index) => {
          const winRate = team.games > 0 ? ((team.wins / team.games) * 100).toFixed(2) : 0
          
          return (
            <div
              key={index}
              className="bg-zinc-900/30 rounded-2xl p-6 border border-white/5 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Team Info */}
                <div className="flex-1">
                   <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Partner</p>
                   <p className="text-xl font-bold text-white">{team.teamname || "Unknown Partner"}</p>
                   <p className="text-sm text-zinc-600 mt-1">{team.region || "Global"}</p>
                </div>

                {/* Rating */}
                <div className="text-center md:text-right">
                    <p className="text-3xl font-black text-indigo-400">{team.rating}</p>
                    <p className="text-xs text-zinc-500 font-medium">Peak {team.peak_rating}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-8 items-center bg-black/20 px-6 py-3 rounded-xl border border-white/5">
                    <div className="text-center">
                        <p className="text-xs text-zinc-500 font-bold">Games</p>
                        <p className="text-white font-bold">{team.games}</p>
                    </div>
                     <div className="text-center">
                        <p className="text-xs text-zinc-500 font-bold">Win Rate</p>
                        <p className="text-emerald-400 font-bold">{winRate}%</p>
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

export default Ranked2v2Section