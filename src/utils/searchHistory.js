const HISTORY_KEY = 'brawlstats_search_history';
const MAX_HISTORY = 5;

export const getSearchHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const addToSearchHistory = (playerId, playerName) => {
  try {
    let history = getSearchHistory();
    
    // Remove if already exists
    history = history.filter(item => item.id !== playerId);
    
    // Add to beginning
    history.unshift({ id: playerId, name: playerName, timestamp: Date.now() });
    
    // Keep only MAX_HISTORY items
    history = history.slice(0, MAX_HISTORY);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
};

export const clearSearchHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear search history:', error);
  }
};