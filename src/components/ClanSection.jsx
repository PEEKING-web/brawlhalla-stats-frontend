function ClanSection({ playerData }) {
  const clan = playerData.clan
  if (!clan || !clan.clan_name) return null

  const contribution = clan.clan_xp && clan.clan_lifetime_xp 
    ? ((clan.personal_xp / clan.clan_lifetime_xp) * 100).toFixed(2)
    : 0

  return (
    <div className="bg-zinc-900/40 rounded-2xl p-6 mb-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center text-xl">🛡️</div>
        <div>
            <h3 className="text-lg font-bold text-white">{clan.clan_name}</h3>
            <p className="text-zinc-500 text-sm">ID: {clan.clan_id}</p>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="text-right">
            <p className="text-zinc-500 text-xs uppercase font-bold">Clan XP</p>
            <p className="text-zinc-200 font-medium">{Number(clan.clan_xp || 0).toLocaleString()}</p>
        </div>
        <div className="text-right">
            <p className="text-zinc-500 text-xs uppercase font-bold">Your Contrib.</p>
            <p className="text-emerald-400 font-medium">{contribution}%</p>
        </div>
      </div>
    </div>
  )
}

export default ClanSection