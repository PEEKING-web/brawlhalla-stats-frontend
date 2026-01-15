import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPlayerStats, getPlayerRanked } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

function Compare() {
  const { id1, id2 } = useParams()
  const navigate = useNavigate()
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [ranked1, setRanked1] = useState(null)
  const [ranked2, setRanked2] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBoth = async () => {
      try {
        setLoading(true)
        const [stats1, stats2, rank1, rank2] = await Promise.all([
          getPlayerStats(id1),
          getPlayerStats(id2),
          getPlayerRanked(id1),
          getPlayerRanked(id2)
        ])
        setPlayer1(stats1)
        setPlayer2(stats2)
        setRanked1(rank1)
        setRanked2(rank2)
        setLoading(false)
      } catch (error) {
        console.error('Comparison failed:', error)
        setLoading(false)
      }
    }
    fetchBoth()
  }, [id1, id2])

  if (loading) return <LoadingSpinner />

  const clearComparison = () => {
    localStorage.removeItem('compare_list')
    navigate('/')
  }

  const CompareRow = ({ label, val1, val2, format = (v) => v }) => {
    const num1 = Number(val1) || 0
    const num2 = Number(val2) || 0
    const winner = num1 > num2 ? 1 : num1 < num2 ? 2 : 0
    
    return (
      <div className="grid grid-cols-3 gap-4 py-4 border-b border-white/5 items-center">
        <div className={`text-right ${winner === 1 ? 'text-emerald-400 font-bold' : 'text-zinc-400'}`}>
          {format(val1)}
        </div>
        <div className="text-center text-zinc-600 text-xs font-black uppercase tracking-wider">
          {label}
        </div>
        <div className={`text-left ${winner === 2 ? 'text-emerald-400 font-bold' : 'text-zinc-400'}`}>
          {format(val2)}
        </div>
      </div>
    )
  }

  const ranked1v1_1 = ranked1?.["1v1"] || ranked1 || {}
  const ranked1v1_2 = ranked2?.["1v1"] || ranked2 || {}

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tight">
            Player <span className="text-indigo-500">Comparison</span>
          </h1>
          <button
            onClick={clearComparison}
            className="text-xs text-zinc-500 hover:text-red-500 font-bold uppercase tracking-wider transition-colors"
          >
            Clear & Exit
          </button>
        </div>

        {/* Player Names Header */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div
            className="text-right cursor-pointer group"
            onClick={() => navigate(`/player/${id1}`)}
          >
            <h2 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
              {player1?.name}
            </h2>
            <p className="text-xs text-zinc-600 font-mono mt-1">ID: {id1}</p>
          </div>
          
          <div className="flex items-center justify-center">
            <span className="text-zinc-700 text-2xl font-black">VS</span>
          </div>
          
          <div
            className="text-left cursor-pointer group"
            onClick={() => navigate(`/player/${id2}`)}
          >
            <h2 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
              {player2?.name}
            </h2>
            <p className="text-xs text-zinc-600 font-mono mt-1">ID: {id2}</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#0a0a0a]/80 border border-white/5 rounded-sm p-6">
          
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-6">
            General Stats
          </h3>
          
          <CompareRow label="Level" val1={player1?.level} val2={player2?.level} />
          <CompareRow 
            label="Total XP" 
            val1={player1?.xp} 
            val2={player2?.xp}
            format={(v) => Number(v).toLocaleString()}
          />
          <CompareRow label="Games Played" val1={player1?.games} val2={player2?.games} />
          <CompareRow 
            label="Win Rate" 
            val1={player1?.games > 0 ? ((player1.wins / player1.games) * 100).toFixed(1) : 0}
            val2={player2?.games > 0 ? ((player2.wins / player2.games) * 100).toFixed(1) : 0}
            format={(v) => `${v}%`}
          />

          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mt-8 mb-6">
            Ranked 1v1
          </h3>
          
          <CompareRow label="Current Rating" val1={ranked1v1_1.rating} val2={ranked1v1_2.rating} />
          <CompareRow label="Peak Rating" val1={ranked1v1_1.peak_rating} val2={ranked1v1_2.peak_rating} />
          <CompareRow label="Ranked Wins" val1={ranked1v1_1.wins} val2={ranked1v1_2.wins} />
          <CompareRow label="Ranked Games" val1={ranked1v1_1.games} val2={ranked1v1_2.games} />

        </div>
      </div>
    </div>
  )
}

export default Compare