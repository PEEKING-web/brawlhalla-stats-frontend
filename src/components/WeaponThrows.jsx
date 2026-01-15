import { useState } from 'react'

function WeaponThrows({ playerData }) {
  const [isOpen, setIsOpen] = useState(false)
  const legends = playerData.legends || []
  
  let totalThrowKos = 0
  let totalThrowDamage = 0

  legends.forEach(legend => {
    totalThrowKos += Number(legend.kothrownitem) || 0
    totalThrowDamage += Number(legend.damagethrownitem) || 0
  })

  const totalGames = playerData.games || 0
  const koEveryGames = totalGames > 0 && totalThrowKos > 0 ? (totalGames / totalThrowKos).toFixed(1) : 0
  const damagePerGame = totalGames > 0 ? (totalThrowDamage / totalGames).toFixed(1) : 0

  return (
    <div className="bg-zinc-900/20 rounded-2xl mb-4 border border-white/5 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
             <span className="text-zinc-400">🎯</span>
             <h3 className="text-lg font-bold text-zinc-200">Weapon Throws</h3>
        </div>
        <span className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="Total KOs" value={totalThrowKos.toLocaleString()} />
            <StatBox label="1 KO Every" value={`${koEveryGames} games`} />
            <StatBox label="Damage Dealt" value={totalThrowDamage.toLocaleString()} />
            <StatBox label="Dmg/Game" value={damagePerGame} />
          </div>
        </div>
      )}
    </div>
  )
}

function StatBox({ label, value }) {
    return (
        <div className="bg-black/20 p-3 rounded-lg">
            <p className="text-zinc-500 text-xs font-bold uppercase">{label}</p>
            <p className="text-zinc-200 font-medium mt-1">{value}</p>
        </div>
    )
}

export default WeaponThrows