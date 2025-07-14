import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'; // Typo fix
import { API_BASE_URL } from '../config/apiConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [loading, setLoading] = useState(true);
  const [refreshIntervalId, setRefreshIntervalId] = useState(null);

  const refreshTokenHandler = useCallback(async () => {
    const currentRefreshToken = localStorage.getItem('refreshToken');
    if (!currentRefreshToken) {
      console.warn('No refresh token found to refresh.');
      logout();
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: currentRefreshToken
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to refresh token');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
      console.log('Token refreshed successfully!');
      return true;
    } catch (error) {
      console.error('Refresh token error:', error);
      logout();
      return false;
    }
  }, []);

  const fetchUserProfile = useCallback(async () => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      console.warn('No access token available to fetch profile.');
      setUser(null);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401 || errorData.error === "Token không hợp lệ") {
          const refreshed = await refreshTokenHandler();
          if (refreshed) {
            return fetchUserProfile();
          }
        }
        throw new Error(errorData.error || 'Failed to fetch profile');
      }

      const data = await response.json();
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
    }
  }, [refreshTokenHandler]);

  const login = useCallback(async (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('refreshToken', userData.refreshToken);
    setToken(userData.token);
    setRefreshToken(userData.refreshToken);
    setIsAuthenticated(true);
    await fetchUserProfile();
  }, [fetchUserProfile]);

  // Logout function
  const logout = useCallback(() => {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      setRefreshIntervalId(null);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  }, [refreshIntervalId]);


  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedRefreshToken = localStorage.getItem('refreshToken');

      if (storedToken && storedRefreshToken) {
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setIsAuthenticated(true); 

        await fetchUserProfile();

        if (!refreshIntervalId) {
          const interval = setInterval(refreshTokenHandler, 15 * 60 * 1000);
          setRefreshIntervalId(interval);
          console.log('Token refresh interval set.');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();

    return () => {
      if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
      }
    };
  }, [fetchUserProfile, refreshTokenHandler, refreshIntervalId]); // Dependencies for useEffect

  const value = {
    isAuthenticated,
    user,
    token,
    loading,
    login,
    logout,
    fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading authentication...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};