import { useState } from 'react'

function GadgetsStats({ playerData }) {
  const [isOpen, setIsOpen] = useState(false)
  const legends = playerData.legends || []
  
  let totalGadgetKos = 0
  let totalGadgetDamage = 0

  legends.forEach(legend => {
    totalGadgetKos += Number(legend.kogadgets) || 0
    totalGadgetDamage += Number(legend.damagegadgets) || 0
  })

  const bombKos = Number(playerData.kobomb) || 0
  const mineKos = Number(playerData.komine) || 0
  const spikeballKos = Number(playerData.kospikeball) || 0
  const snowballKos = Number(playerData.kosnowball) || 0
  const sidekickKos = Number(playerData.kosidekick) || 0

  const bombDamage = Number(playerData.damagebomb) || 0
  const mineDamage = Number(playerData.damagemine) || 0
  const spikeballDamage = Number(playerData.damagespikeball) || 0
  const sidekickDamage = Number(playerData.damagesidekick) || 0

  const totalKos = bombKos + mineKos + spikeballKos + snowballKos + sidekickKos + totalGadgetKos
  const totalDamage = bombDamage + mineDamage + spikeballDamage + sidekickDamage + totalGadgetDamage
  const totalGames = playerData.games || 0
  const koEveryGames = totalGames > 0 && totalKos > 0 ? (totalGames / totalKos).toFixed(1) : 0
  const damagePerGame = totalGames > 0 ? (totalDamage / totalGames).toFixed(1) : 0

  return (
    <div className="bg-zinc-900/20 rounded-2xl mb-4 border border-white/5 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
             <span className="text-zinc-400">💣</span>
             <h3 className="text-lg font-bold text-zinc-200">Gadgets</h3>
        </div>
        <span className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatBox label="Total KOs" value={totalKos.toLocaleString()} />
            <StatBox label="1 KO Every" value={`${koEveryGames} games`} />
            <StatBox label="Total Damage" value={totalDamage.toLocaleString()} />
            <StatBox label="Dmg/Game" value={damagePerGame} />
          </div>

          <div className="space-y-3">
             <p className="text-zinc-600 text-xs uppercase font-bold tracking-wider">Breakdown</p>
             <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <MiniStat name="Bomb" ko={bombKos} dmg={bombDamage} />
                <MiniStat name="Mine" ko={mineKos} dmg={mineDamage} />
                <MiniStat name="Spike" ko={spikeballKos} dmg={spikeballDamage} />
                <MiniStat name="Snowball" ko={snowballKos} />
                <MiniStat name="Sidekick" ko={sidekickKos} dmg={sidekickDamage} />
             </div>
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

function MiniStat({ name, ko, dmg }) {
    return (
        <div className="bg-zinc-800/40 p-2 rounded text-center border border-white/5">
            <p className="text-zinc-400 text-xs mb-1">{name}</p>
            <p className="text-white font-bold text-sm">{ko} <span className="text-zinc-600 font-normal text-xs">KOs</span></p>
        </div>
    )
}

export default GadgetsStats