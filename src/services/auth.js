import axios from 'axios';

// Use relative URL (empty string) to use Vercel proxy
const API_URL = import.meta.env.VITE_API_URL || '';

const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true
});

export const loginWithSteam = () => {
  // Now points to /auth/steam which Vercel proxies to Railway
  window.location.href = `${API_URL}/auth/steam`;
};


export const getCurrentUser = async () => {
  try {
    const response = await authAPI.get('/user', {
      withCredentials: true, // ⭐ ADD THIS explicitly
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return { authenticated: false };
  }
};

export const linkBrawlhallaAccount = async (brawlhallaId) => {
  try {
    const response = await authAPI.post('/link-brawlhalla', 
      { brawlhallaId },
      { withCredentials: true } //   THIS
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to link account' };
  }
};

export const unlinkBrawlhallaAccount = async () => {
  try {
    const response = await authAPI.post('/unlink-brawlhalla', {}, {
      withCredentials: true // ⭐ ADD THIS
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to unlink account' };
  }
};

export const logout = async () => {
  try {
    const response = await authAPI.get('/logout', {
      withCredentials: true // ⭐ ADD THIS
    });
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export default authAPI;