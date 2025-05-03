import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (credentials) => {
    // Implement your sign in logic here
    setIsAuthenticated(true);
    setUser({ name: 'User Name', email: 'user@example.com' });
  };

  const signOut = async () => {
    // Implement your sign out logic here
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    user,
    loading,
    signIn,
    signOut
  };
};