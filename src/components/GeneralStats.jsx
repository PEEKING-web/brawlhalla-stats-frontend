"use client"

import { useState } from "react"

function GeneralStats({ playerData }) {
  const [isOpen, setIsOpen] = useState(true)

  // Calculate totals from legends array
  const legends = playerData.legends || []

  let totalKos = 0
  let totalFalls = 0
  let totalSuicides = 0
  let totalTeamKos = 0
  let totalDamageDealt = 0
  let totalDamageTaken = 0
  let totalMatchtime = 0
  let totalLegendGames = 0
  let totalLegendWins = 0

  legends.forEach((legend) => {
    totalKos += Number(legend.kos) || 0
    totalFalls += Number(legend.falls) || 0
    totalSuicides += Number(legend.suicides) || 0
    totalTeamKos += Number(legend.teamkos) || 0
    totalDamageDealt += Number(legend.damagedealt) || 0
    totalDamageTaken += Number(legend.damagetaken) || 0
    totalMatchtime += Number(legend.matchtime) || 0
    totalLegendGames += Number(legend.games) || 0
    totalLegendWins += Number(legend.wins) || 0
  })

  const totalGames = playerData.games || totalLegendGames
  const wins = playerData.wins || totalLegendWins
  const losses = totalGames - wins
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : 0

  const dpsDealt = totalMatchtime > 0 ? (totalDamageDealt / totalMatchtime).toFixed(2) : 0
  const dpsTaken = totalMatchtime > 0 ? (totalDamageTaken / totalMatchtime).toFixed(2) : 0
  const timeToKill = totalKos > 0 ? (totalMatchtime / totalKos).toFixed(1) : 0
  const timeToFall = totalFalls > 0 ? (totalMatchtime / totalFalls).toFixed(1) : 0

  const avgKos = totalGames > 0 ? (totalKos / totalGames).toFixed(2) : 0
  const avgFalls = totalGames > 0 ? (totalFalls / totalGames).toFixed(2) : 0
  const suicideEvery = totalGames > 0 && totalSuicides > 0 ? (totalGames / totalSuicides).toFixed(1) : 0
  const teamKoEvery = totalGames > 0 && totalTeamKos > 0 ? (totalGames / totalTeamKos).toFixed(1) : 0
  const avgDmgDealt = totalGames > 0 ? (totalDamageDealt / totalGames).toFixed(1) : 0
  const avgDmgTaken = totalGames > 0 ? (totalDamageTaken / totalGames).toFixed(1) : 0
  const avgGameLength = totalGames > 0 ? (totalMatchtime / totalGames).toFixed(1) : 0

  const totalDamage = totalDamageDealt + totalDamageTaken
  const damageDealtPercent = totalDamage > 0 ? (totalDamageDealt / totalDamage) * 100 : 50
  const damageTakenPercent = 100 - damageDealtPercent

  return (
    <div className="bg-zinc-900/40 rounded-3xl mb-8 border border-white/5 overflow-hidden transition-all duration-500">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-colors duration-300"
      >
        <div>
           <h3 className="text-2xl font-bold text-white tracking-tight">
            General Overview
          </h3>
          <p className="text-zinc-500 text-sm mt-1">Lifetime performance statistics</p>
        </div>
       
        <span
          className={`text-zinc-400 text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="px-8 pb-8 pt-0 space-y-8">
          
          {/* Hero Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             {/* Games / Win Rate */}
            <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Games</p>
                        <p className="text-4xl font-bold text-white mt-1">{totalGames.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                         <span className="text-emerald-400 font-bold text-xl">{winRate}%</span>
                         <span className="text-zinc-600 text-sm ml-2">WR</span>
                    </div>
                </div>
                
                <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-emerald-500 rounded-full" style={{ width: `${winRate}%` }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs font-medium">
                    <span className="text-emerald-500">{wins} Wins</span>
                    <span className="text-rose-500">{losses} Losses</span>
                </div>
            </div>

            {/* Damage Volume */}
             <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                 <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Damage</p>
                        <p className="text-4xl font-bold text-white mt-1">{(totalDamageDealt/1000000).toFixed(2)}M</p>
                    </div>
                    <div className="text-right">
                         <span className="text-indigo-400 font-bold text-xl">{avgDmgDealt}</span>
                         <span className="text-zinc-600 text-sm ml-2">AVG/GAME</span>
                    </div>
                </div>

                <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-indigo-500 rounded-full" style={{ width: `${damageDealtPercent}%` }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs font-medium">
                    <span className="text-indigo-400">Dealt</span>
                    <span className="text-zinc-600">Taken</span>
                </div>
             </div>
          </div>

          {/* Grid Stats */}
          <div>
            <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4 pl-1">Combat Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard label="KOs" value={totalKos.toLocaleString()} subValue={`Avg ${avgKos}`} />
              <StatCard label="Falls" value={totalFalls.toLocaleString()} subValue={`Avg ${avgFalls}`} color="text-rose-400" />
              <StatCard label="Suicides" value={totalSuicides.toLocaleString()} subValue={`1 in ${suicideEvery}`} />
              <StatCard label="Team KOs" value={totalTeamKos.toLocaleString()} subValue={`1 in ${teamKoEvery}`} />
              <StatCard label="DPS Dealt" value={dpsDealt} subValue="dmg/sec" />
              <StatCard label="DPS Taken" value={dpsTaken} subValue="dmg/sec" />
            </div>
          </div>
          
           <div>
            <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4 pl-1">Timing Metrics</h4>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <StatCard label="Time to Kill" value={timeToKill} subValue="seconds" />
                <StatCard label="Time to Fall" value={timeToFall} subValue="seconds" />
                <StatCard label="Avg Game Length" value={avgGameLength} subValue="seconds" />
             </div>
           </div>

        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, subValue, color = "text-white" }) {
    return (
        <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 hover:border-white/10 hover:bg-zinc-800/50 transition-all duration-200">
            <p className="text-zinc-500 text-xs font-medium mb-1">{label}</p>
            <p className={`text-2xl font-bold tracking-tight ${color}`}>{value}</p>
            {subValue && <p className="text-zinc-600 text-xs mt-1">{subValue}</p>}
        </div>
    )
}

export default GeneralStats