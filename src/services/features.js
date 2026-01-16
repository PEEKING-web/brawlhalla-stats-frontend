import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const featuresAPI = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // ✅ This 
  timeout: 10000
});
// ===== FAVORITES =====
export const getFavorites = async () => {
  const response = await featuresAPI.get('/favorites');
  return response.data;
};

export const addFavorite = async (brawlhallaId, playerName) => {
  const response = await featuresAPI.post('/favorites', { brawlhallaId, playerName });
  return response.data;
};

export const removeFavorite = async (brawlhallaId) => {
  const response = await featuresAPI.delete(`/favorites/${brawlhallaId}`);
  return response.data;
};

export const checkFavorite = async (brawlhallaId) => {
  const response = await featuresAPI.get(`/favorites/check/${brawlhallaId}`);
  return response.data;
};

// ===== NOTES =====
export const getNotesForPlayer = async (brawlhallaId) => {
  const response = await featuresAPI.get(`/notes/player/${brawlhallaId}`);
  return response.data;
};

export const getAllNotes = async () => {
  const response = await featuresAPI.get('/notes');
  return response.data;
};

export const createNote = async (brawlhallaId, playerName, note, category) => {
  const response = await featuresAPI.post('/notes', { 
    brawlhallaId, 
    playerName, 
    note, 
    category 
  });
  return response.data;
};

export const updateNote = async (noteId, note, category) => {
  const response = await featuresAPI.put(`/notes/${noteId}`, { note, category });
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await featuresAPI.delete(`/notes/${noteId}`);
  return response.data;
};

// ===== TRACKING =====
export const getTrackedPlayers = async () => {
  const response = await featuresAPI.get('/tracking');
  return response.data;
};

export const trackPlayer = async (brawlhallaId, playerName) => {
  const response = await featuresAPI.post('/tracking', { brawlhallaId, playerName });
  return response.data;
};

export const untrackPlayer = async (brawlhallaId) => {
  const response = await featuresAPI.delete(`/tracking/${brawlhallaId}`);
  return response.data;
};

export const updateTrackedPlayer = async (brawlhallaId) => {
  const response = await featuresAPI.post(`/tracking/${brawlhallaId}/update`);
  return response.data;
};

export const checkTracking = async (brawlhallaId) => {
  const response = await featuresAPI.get(`/tracking/check/${brawlhallaId}`);
  return response.data;
};

export default featuresAPI;