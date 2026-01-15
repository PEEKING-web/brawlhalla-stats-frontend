import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CompareButton({ playerId, playerName }) {
  const [compareList, setCompareList] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    const stored = localStorage.getItem('compare_list')
    if (stored) {
      setCompareList(JSON.parse(stored))
    }
  }, [])
  
  const isInCompareList = compareList.some(p => p.id === playerId)
  
  const toggleCompare = () => {
    let newList
    if (isInCompareList) {
      newList = compareList.filter(p => p.id !== playerId)
    } else {
      if (compareList.length >= 2) {
        alert('You can only compare 2 players at a time. Remove one first.')
        return
      }
      newList = [...compareList, { id: playerId, name: playerName }]
    }
    
    setCompareList(newList)
    localStorage.setItem('compare_list', JSON.stringify(newList))
  }
  
  const goToCompare = () => {
    if (compareList.length === 2) {
      navigate(`/compare/${compareList[0].id}/${compareList[1].id}`)
    }
  }
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleCompare}
        className={`px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all ${
          isInCompareList
            ? 'bg-indigo-600 text-white border border-indigo-500'
            : 'bg-zinc-900 text-zinc-400 border border-white/10 hover:border-indigo-500/50'
        }`}
      >
        {isInCompareList ? '✓ Added' : '+ Compare'}
      </button>
      
      {compareList.length === 2 && (
        <button
          onClick={goToCompare}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm text-[10px] font-black uppercase tracking-wider transition-all"
        >
          View Comparison →
        </button>
      )}
    </div>
  )
}

export default CompareButton