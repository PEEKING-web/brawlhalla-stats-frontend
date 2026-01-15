import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true
});

export const loginWithSteam = () => {
  window.location.href = `${API_URL}/auth/steam`;
};


export const getCurrentUser = async () => {
  try {
    const response = await authAPI.get('/user', {
      timeout: 3000 // 3 second timeout
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return { authenticated: false };
  }
};
export const linkBrawlhallaAccount = async (brawlhallaId) => {
  try {
    const response = await authAPI.post('/link-brawlhalla', { brawlhallaId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to link account' };
  }
};

export const unlinkBrawlhallaAccount = async () => {
  try {
    const response = await authAPI.post('/unlink-brawlhalla');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to unlink account' };
  }
};

export const logout = async () => {
  try {
    const response = await authAPI.get('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};


export default authAPI;