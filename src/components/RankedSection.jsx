function RankedSection({ rankedData, playerData }) {
  const EmptyState = ({ message }) => (
    <div className="bg-zinc-900/40 rounded-3xl p-8 mb-6 border border-white/5">
      <h3 className="text-xl font-bold text-white mb-2">Ranked Season</h3>
      <p className="text-zinc-500">{message}</p>
    </div>
  )

  if (!rankedData) return <EmptyState message="No ranked data available" />
  
  const ranked1v1 = rankedData["1v1"] || rankedData
  if (!ranked1v1 || !ranked1v1.rating) return <EmptyState message="No 1v1 data available" />

  const winRate = ranked1v1.games > 0 ? ((ranked1v1.wins / ranked1v1.games) * 100).toFixed(2) : 0
  const losses = ranked1v1.games - ranked1v1.wins

  // Find best legend from playerData.legends (same as LegendsTab)
  let bestLegendName = 'N/A';
  let bestLegendGames = 0;

  if (playerData && playerData.legends && Array.isArray(playerData.legends) && playerData.legends.length > 0) {
    // Sort legends by games played (SAME LOGIC AS LEGENDSTAB)
    const sortedLegends = [...playerData.legends]
      .filter(legend => legend.games > 0)
      .sort((a, b) => (b.games || 0) - (a.games || 0));
    
    if (sortedLegends.length > 0) {
      const bestLegend = sortedLegends[0];
      bestLegendName = bestLegend.legend_name_key 
        ? bestLegend.legend_name_key.charAt(0).toUpperCase() + bestLegend.legend_name_key.slice(1)
        : 'Unknown';
      bestLegendGames = bestLegend.games;
    }
  }

  return (
    <div className="bg-zinc-900/40 rounded-3xl p-8 mb-6 border border-white/5 relative overflow-hidden group">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 transition-all duration-700 group-hover:bg-indigo-500/10"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-widest mb-1">Ranked 1v1</h3>
          <div className="flex items-baseline gap-3">
             <span className="text-6xl font-black text-white tracking-tighter">
                {ranked1v1.rating}
             </span>
             <div className="flex flex-col text-sm font-medium text-zinc-500">
                <span>ELO</span>
                <span className="text-indigo-400">Peak: {ranked1v1.peak_rating}</span>
             </div>
          </div>
        </div>

        <div className="w-full md:w-64">
             <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-emerald-400">{ranked1v1.wins}W</span>
                <span className="text-zinc-400">{winRate}% WR</span>
                <span className="text-rose-400">{losses}L</span>
             </div>
             <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${winRate}%` }}></div>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: "Games Played", value: ranked1v1.games },
          { label: "Win Rate", value: `${winRate}%` },
          { label: "Est. Glory", value: (ranked1v1.rating * 10).toLocaleString(), color: "text-amber-400" },
          { label: "Tier", value: ranked1v1.tier || "N/A" },
          { label: "Best Legend", value: bestLegendName },
          { label: "Games", value: bestLegendGames }
        ].map((stat, idx) => (
          <div key={idx} className="bg-black/20 p-4 rounded-2xl border border-white/5">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-lg font-bold ${stat.color || 'text-zinc-200'}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RankedSection