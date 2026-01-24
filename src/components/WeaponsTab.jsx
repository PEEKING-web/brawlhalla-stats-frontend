import { useState } from 'react'

function WeaponsTab({ playerData }) {
  const [sortBy, setSortBy] = useState('damage')

  
  const legends = playerData.legends || []
  let totalWeapon1Damage = 0, totalWeapon1Kos = 0
  let totalWeapon2Damage = 0, totalWeapon2Kos = 0
  let totalUnarmedDamage = 0, totalUnarmedKos = 0

  legends.forEach(legend => {
    totalWeapon1Damage += Number(legend.damageweaponone) || 0
    totalWeapon1Kos += Number(legend.koweaponone) || 0
    totalWeapon2Damage += Number(legend.damageweapontwo) || 0
    totalWeapon2Kos += Number(legend.koweapontwo) || 0
    totalUnarmedDamage += Number(legend.damageunarmed) || 0
    totalUnarmedKos += Number(legend.kounarmed) || 0
  })

  const totalGames = playerData.games || 1

  const weaponData = [
    {
      name: 'Weapon Slot 1',
      damage: totalWeapon1Damage,
      kos: totalWeapon1Kos,
      avgDamage: (totalWeapon1Damage / totalGames).toFixed(1),
      avgKos: (totalWeapon1Kos / totalGames).toFixed(2)
    },
    {
      name: 'Weapon Slot 2',
      damage: totalWeapon2Damage,
      kos: totalWeapon2Kos,
      avgDamage: (totalWeapon2Damage / totalGames).toFixed(1),
      avgKos: (totalWeapon2Kos / totalGames).toFixed(2)
    },
    {
      name: 'Unarmed',
      damage: totalUnarmedDamage,
      kos: totalUnarmedKos,
      avgDamage: (totalUnarmedDamage / totalGames).toFixed(1),
      avgKos: (totalUnarmedKos / totalGames).toFixed(2)
    }
  ]

  const sortedWeapons = [...weaponData].sort((a, b) => {
    if (sortBy === 'damage') return b.damage - a.damage
    if (sortBy === 'kos') return b.kos - a.kos
    return 0
  })

  return (
    <div className="w-full space-y-4">
      {/* Header Row - Aligned with your other titles */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xl font-bold text-white tracking-tight uppercase">
          Weapon Statistics
        </h3>
        
        {/* Clean Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-500 uppercase">Sort By:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-white/10 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
          >
            <option value="damage">Damage</option>
            <option value="kos">KOs</option>
          </select>
        </div>
      </div>

      {/* Main Container - Matches your GeneralStats spacing */}
      <div className="grid grid-cols-1 gap-4">
        {sortedWeapons.map((weapon, index) => (
          <div key={index} className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
            <div className="flex flex-col md:flex-row md:items-center">
              
              {/* Vertical Centering for Title */}
              <div className="md:w-1/4 mb-4 md:mb-0">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">Source</p>
                <h4 className="text-lg font-black text-white uppercase">{weapon.name}</h4>
              </div>

              {/* Stats Bar - Matches your grid-cols-4 from GeneralStats */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 md:border-l md:border-white/5 md:pl-8">
                <div className="flex flex-col justify-center">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">Total KOs</p>
                  <p className="text-white text-xl font-black italic">{weapon.kos.toLocaleString()}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">Avg KOs</p>
                  <p className="text-indigo-400 text-xl font-black italic">{weapon.avgKos}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">Total Damage</p>
                  <p className="text-white text-xl font-black italic">{weapon.damage.toLocaleString()}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">Avg Damage</p>
                  <p className="text-indigo-400 text-xl font-black italic">{weapon.avgDamage}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeaponsTab