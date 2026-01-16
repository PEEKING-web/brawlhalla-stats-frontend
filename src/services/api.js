import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const api = axios.create({
  baseURL: `${API_URL}/api/brawlhalla`,
  withCredentials: true,
  timeout: 10000
});

// Cache helper functions
const getCacheKey = (url, params) => {
  return `${url}_${JSON.stringify(params || {})}`;
};

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Get player stats with caching
export const getPlayerStats = async (playerId) => {
  const cacheKey = getCacheKey(`player/${playerId}/stats`);
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await api.get(`/player/${playerId}/stats`);
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Player not found');
    }
    throw new Error('Failed to fetch player stats');
  }
};

// Get player ranked info with caching
export const getPlayerRanked = async (playerId) => {
  const cacheKey = getCacheKey(`player/${playerId}/ranked`);
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await api.get(`/player/${playerId}/ranked`);
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Ranked data not found');
    }
    throw new Error('Failed to fetch ranked data');
  }
};

// Get leaderboard with caching
export const getLeaderboard = async (bracket = '1v1', region = 'all', page = 1) => {
  const cacheKey = getCacheKey(`rankings/${bracket}/${region}/${page}`);
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await api.get(`/rankings/${bracket}/${region}/${page}`);
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch leaderboard data');
  }
};

export default api;

